'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lhp-blasting', function() {

  var LHPReportsArray = [];

  describe('Test Step ID: 551678', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "lhp_blasting" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lhp-blasting');
    });

    it('Verifying if "Weights" report is in focus', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(reportRef) {
        reportRef.getAttribute('class').then(function(reportStatus) {
          if (reportStatus.indexOf('selected') < 0) {
            expect(false).customError('"Weights" report is not in focus');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 551760', function() {

    var screenShot = 0;

    it('Should type "Client:/pa3/test" into "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'Client:/pa3/TEST.ACCT').then(function(select) {
        if (!select) {
          expect(false).customError('Error occurred while selecting "Client:/pa3/TEST.ACCT" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should get all the LHP reports for future use', function() {
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Reports').then(function(reportsArray) {
        LHPReportsArray = reportsArray;
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "Apply To Weights" hyperlink ', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press();
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if reports in the "Blasting" widget match with the reports in the LHP', function() {
      LHPReportsArray.forEach(function(report) {
        TileOptionsGroupings.getCheckBoxFromBlastWindow(report).isPresent().then(function(reportAvail) {
          if (!reportAvail) {
            expect(false).customError(report + ' report is not available in the blasting window');
            screenShot++;
          }

          if (screenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 551761', function() {

    var count = 0;

    it('Should click on "Cancel" button in "Blasting" Widget', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button in "Blasting" Widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Cancel" button in "weights Options" dialog', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press();
    });

    it('Should click on "Performance" report wrench and select "Duplicate" from reports options list', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Performance').getActions().then(function(actions) {
        actions.triggerAction('duplicate');
      });
    });

    it('Should click on "Contribution" report wrench and select "Rename" from reports options list', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').getActions().then(function(actions) {
        actions.triggerAction('rename');
      });
    });

    it('Should type "Contribution - Edit" and hit enter', function() {
      PA3MainPage.getReportRenameField('Contribution').sendKeys('Contribution - Edit', protractor.Key.ENTER);
    });

    it('Should click on "+/-" icon in the LHP', function() {
      PA3MainPage.getLHPEditIcon().click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "+/-" icon in the LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should double click on "Raw Factor Exposures" under "Equity Risk"', function() {

      // Scroll until element is visible
      Utilities.scrollElementToVisibility(PA3EditMode.getChartImageFromGroup('Equity Risk', 'Raw Factor Exposures'));

      // Performing double click
      browser.actions().doubleClick(PA3EditMode.getChartImageFromGroup('Equity Risk', 'Raw Factor Exposures'))
        .perform();
    });

    it('Should click on "Done" to close "Edit Report List"', function() {
      ThiefHelpers.getButtonClassReference('Done').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Performance" report is displayed two times in LHP', function() {
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Reports').then(function(reports) {
        reports.forEach(function(report) {
          if (report === 'Performance') {
            count++;
          }
        });

        if (count !== 2) {
          expect(false).customError('"Performance" report is not displayed two times in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is renamed to "Contribution - Edit"', function() {
      PA3MainPage.getReports('Contribution').isPresent().then(function(contributionReport) {
        if (!contributionReport) {
          PA3MainPage.getReports('Contribution - Edit').isPresent().then(function(contributionEditReport) {
            if (!contributionEditReport) {
              expect(false).customError('"Contribution - Edit" is not appeared in LHP');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Contribution" report is not renamed to "Contribution - Edit"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Raw Factor Exposure" is displayed under "Weights" in LHP', function() {
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Reports').then(function(reports) {
        for (var i = 0; i < reports.length; i++) {
          if (reports[i] === 'Weights') {
            if (reports[i + 1] !== 'Raw Factor Exposures') {
              expect(false).customError('"Raw Factor Exposure" is not displayed under "Weights" in LHP');
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

  describe('Test Step ID: 551762', function() {

    it('Should click on "Multi-Horizon Returns" report wrench and select "Remove" from reports options list', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Multi-Horizon Returns').getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Verifying if warning pop-up appears and click on "OK" button in pop-up', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Multi-Horizon Returns" report is removed from the LHP', function() {
      PA3MainPage.getReports('Multi-Horizon Returns').isPresent().then(function(MHRReport) {
        if (MHRReport) {
          expect(false).customError('"Multi-Horizon Returns" report is not removed from the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 551763', function() {

    var reports = ['Estimates', 'Valuation - Detail'];

    it('Should select "Valuation - Detail" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Valuation - Detail').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Valuation-Detail" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Should click on reports wrench icon', function() {
      PA3MainPage.getReportWrenchButton('Valuation - Detail').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on reports wrench icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Rename" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Rename');
    });

    it('Should type "Valuation - Multi" and hit enter', function() {
      PA3MainPage.getReportRenameField('Valuation - Detail').sendKeys('Valuation - Multi', protractor.Key.ENTER);
    });

    it('Verifying if "Valuation - Detail" report is renamed to "Valuation - Multi"', function() {
      PA3MainPage.getReports('Valuation - Detail').isPresent().then(function(ValuationDetailStatus) {
        if (!ValuationDetailStatus) {
          PA3MainPage.getReports('Valuation - Multi').isPresent().then(function(ValuationMultiStatus) {
            if (!ValuationMultiStatus) {
              expect(false).customError('"Valuation - Multi" is not appeared in LHP');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Valuation - Detail" report is not renamed to "Valuation - Multi"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Valuation - Multi" report is selected', function() {
      PA3MainPage.getReports('Valuation - Multi').getAttribute('class').then(function(reportStatus) {
        if (reportStatus.indexOf('selected') < 0) {
          expect(false).customError('"Valuation - Multi" report did not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 551764', function() {

    var screenShot = 0;

    it('Should select "Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Weights" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should get all the LHP reports for future use', function() {
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Reports').then(function(reportsArray) {
        LHPReportsArray = reportsArray;
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "Apply To Weights" hyperlink ', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press();
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if reports in the "Blasting" widget match with the reports in the LHP', function() {
      LHPReportsArray.forEach(function(report) {
        if (report === 'Contribution - Edit') {
          report = 'Contribution';
        }

        TileOptionsGroupings.getCheckBoxFromBlastWindow(report).isPresent().then(function(reportAvail) {
          if (!reportAvail) {
            expect(false).customError(report + ' report is not available in the blasting window');
            screenShot++;
          }

          if (screenShot === 1) {
            CommonFunctions.takeScreenShot('ScreenShot');
          }
        });
      });
    });

  });

  describe('Test Step ID: 551765', function() {

    it('Should click on "Cancel" button in "Blasting" Widget', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button in "Blasting" Widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" widget is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All/X" icon from the  selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if count of elements in the selected section to be "0"', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Count of elements to be "0" in selected section instead "' + count + '" ' +
            'elements displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Asset Class" in the "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class'))
        .perform();
    });

    it('Verifying if count of elements in the selected section to be "1"', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(count) {
        if (count !== 1) {
          expect(false).customError('Count of elements to be "1" in selected section instead "' + count + '" ' +
            'elements displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Asset Class" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 551766', function() {

    it('Should click on "Apply To Weights" hyperlink ', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press();
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, '//*[@id="blastPanelgroupings"]').then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check off the "Raw Factor Exposures" "Contribution", "Valuation - Multi" check boxes', function() {
      var reportsArray = ['Raw Factor Exposures', 'Contribution', 'Valuation - Multi'];
      reportsArray.forEach(function(report) {
        ThiefHelpers.getCheckBoxClassReference(report).check();
      });
    });

    it('Should click on "OK" button in "Blasting" Widget', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in "Blasting" Widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, '//*[@id="blastPanelgroupings"]').then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" widget is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Apply to Weights" hyperlink  is renamed to "Apply to Multiple Reports"', function() {
      ThiefHelpers.isPresent('button', 'Apply To Weights').then(function(status) {
        if (!status) {
          ThiefHelpers.isPresent('button', 'Apply To Multiple Reports').then(function(status) {
            if (!status) {
              expect(false).customError('"Apply To Multiple Reports" hyperlink is not appeared');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Apply To Weights" is not renamed to "Apply To Multiple Reports"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 551767', function() {

    it('Should click on "OK" button to close "Weights Options" dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Verifying if "Weights Options" dialog is closed', function() {
      TileOptions.isTileOptionsMode().then(function(tileOption) {
        if (tileOption) {
          expect(false).customError('"Tile Options" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Raw Factor Exposures', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Raw Factor Exposures');

    it('Verifying if "Asset Class" grouping is displayed in the "Raw Factor Exposures"', function() {
      PA3MainPage.getGroupingsHyperLink('Raw Factor Exposures').getText().then(function(groupingText) {
        if (groupingText !== 'Asset Class') {
          expect(false).customError('"Asset Class" grouping is not displayed in the "Raw Factor Exposures"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 551768', function() {

    var reports = ['Estimates', 'Valuation - Detail'];

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Valuation - Multi', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Verifying if "Asset Class" grouping is displayed in the "Estimates" and "Valuation - Detail" reports', function() {
      reports.forEach(function(report) {
        PA3MainPage.getGroupingsHyperLink(report).getText().then(function(groupingText) {
          if (groupingText !== 'Asset Class') {
            expect(false).customError('"Asset Class" grouping is not displayed in ' + report + ' report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 551769', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution - Edit', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "Asset Class" grouping is displayed in the "Contribution - Edit"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(groupingText) {
        if (groupingText !== 'Asset Class') {
          expect(false).customError('"Asset Class" grouping is not displayed in the "Contribution - Edit"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
