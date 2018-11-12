'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lhp-cancel', function() {

  describe('Test Step ID: 477759', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "LHP-CANCEL" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lhp-cancel');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfCharts = ['Weights Difference Chart', 'Weights Difference Chart', 'Portfolio Weights Chart'];

    arrOfCharts.forEach(function(chartName) {
      // Wait for the loading icon to disappear and verify if chart is displayed
      CommonPageObjectsForPA3.verifyIfChartIsDisplayed(chartName);
    });

  });

  describe('Test Step ID: 477762', function() {

    it('Should click on the "+/-" icon in the LHP to enter Edit Report list view', function() {
      ThiefHelpers.getNavepaneClassReference().addItem();
    });

    it('Verifying if "Edit Mode" page is opened', function() {
      PA3EditMode.isEditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Edit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 477763', function() {

    it('Should select "Equity Characteristics" from "All Sections" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Equity Characteristics', undefined, PA3EditMode.xpathOfAllSectors);

      // verifying if 'Equity Characteristics' is selected from "All Sections" section drop down
      ThiefHelpers.verifySelectedDropDownText('Equity Characteristics', undefined, PA3EditMode.xpathOfAllSectors);
    });

    it('Should double click on "Characteristics Overview"', function() {
      browser.actions().doubleClick(element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLibraryItem, 'Characteristics Overview')))).perform();
    });

    var arrOfLhpReports = ['Weights', 'Characteristics Overview'];
    it('Verifying if "Characteristics Overview" is displayed under "Weights"', function() {
      element.all(by.xpath(PA3MainPage.xpathOfLhpItems)).each(function(element, index) {
        element.getText().then(function(reportName) {
          if (index < 2) {
            if (reportName !== arrOfLhpReports[index]) {
              expect(false).customError('"Characteristics Overview" is not displayed under "Weights"');
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

    // Verifying if "Characteristics Overview" report opens
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Characteristics Overview', undefined, 'isSelected');

  });

  describe('Test Step ID: 477764', function() {

    it('Should hover on Weights and click "Edit Layout" from the Wrench', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').getActions().then(function(actions) {
        actions.triggerAction('rename').then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should enter "Testing 1" in the text box', function() {
      ThiefHelpers.getTextBoxClassReference('', '//tf-navpane-item//tf-textbox').setText('Testing 1');
    });

    it('Verifying if "Testing 1" is displayed in the LHP', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLhpReports, 'Testing 1'))).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Testing 1" is not displayed in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" is not displayed in the LHP', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLhpReports, 'Weights'))).isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Weights" is displayed in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if "Characteristics Overview" report is selected
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Characteristics Overview', undefined, 'isSelected');

  });

  describe('Test Step ID: 477765', function() {

    it('Should hover on Weights and click "Duplicate" from the Wrench', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Performance').getActions().then(function(actions) {
        actions.triggerAction('duplicate').then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verify if 2 Performance options are displayed in the LHP', function() {
      element.all(by.xpath(CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfLhpReports, 'Performance'))).count().then(function(count) {
        if (count !== 2) {
          expect(false).customError(' 2 Performance options are displayed in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if "Characteristics Overview" report is selected
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Characteristics Overview', undefined, 'isSelected');

  });

  describe('Test Step ID: 477768', function() {

    it('Should click on the "magnifying glass" in the top right corner', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3EditMode.xpathOfLookupIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to on the "magnifying glass" in the top right corner.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old', undefined, false, false);
    });

    it('Verifying if "Client:default_doc_OLD" document is displayed next to "Lookup" icon', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfDocument, 'Client:default_doc_OLD'))).isDisplayed().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Client:default_doc_OLD" document is not displayed next to "Lookup" icon');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 477769', function() {

    it('Should double click on "Attribution Over Time Chart"', function() {
      browser.actions().doubleClick(element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLibraryItem, 'Attribution Over Time Chart')))).perform();
    });

    var arrOfLhpReports = ['Testing 1','Characteristics Overview', 'Attribution Over Time Chart'];
    it('Verifying if "Attribution Over Time Chart" is displayed under "Characteristics Overview"', function() {
      element.all(by.xpath(PA3MainPage.xpathOfLhpItems)).each(function(element, index) {
        element.getText().then(function(reportName) {
          if (index < 3) {
            if (reportName !== arrOfLhpReports[index]) {
              expect(false).customError('"Attribution Over Time Chart" is not displayed under "Characteristics Overview"');
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

    // Verifying if "Attribution Over Time Chart" report is Selected
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Attribution Over Time Chart', undefined, 'isSelected');
  });

  describe('Test Step ID: 477770', function() {

    it('Should click on Cancel button Edit Report list view', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click  on Cancel button Edit Report list view.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Mode" page is opened', function() {
      PA3EditMode.isEditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Edit Mode" page still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfLHPItems = ['Weights', 'Top 10 Positions', 'Pre & Post Trade', 'Characteristics - Summary', 'Valuation - Detail', 'Performance'];

    arrOfLHPItems.forEach(function(reportName) {
      var xpathOfReport = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfLhpReports, reportName);
      it('Verify if "' + reportName + '" report is displayed in the LHP', function() {
        element(by.xpath(xpathOfReport)).isDisplayed().then(function(displayed) {
          if (!displayed) {
            expect(false).customError('"' + reportName + '" report is not displayed in the LHP');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

});
