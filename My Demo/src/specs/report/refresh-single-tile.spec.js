'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: refresh-single-tile', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 657451', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Sould open "Client:;Pa3;Real_Time;OneTile_Refresh" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('onetile-refresh');
    });

    /* Known issue - RPD:26863106 */
    it('Should select "Russell: 1000" and click on "OK" button if "Russell: 1000" is not already selected', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(benchmark) {
        if (benchmark !== 'BENCH:R.1000') {
          PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
            PA3MainPage.getSingleAccountFromList('Benchmark', 'Russell 1000').click().then(function() {
              PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {}, function() {

                expect(false).customError('Unable to click on "Ok" button');
                CommonFunctions.takeScreenShot();
              });
            }, function() {

              expect(false).customError('Unable to select "Russell 1000"');
              CommonFunctions.takeScreenShot();
            });
          }, function() {

            expect(false).customError('Unable to click on "Benchmark hamburger" icon');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('Known issue - RPD:26863106 has been resolved, Please update the step');
        }
      });
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'CLIENT:/PA3/PRINTING/DEMO_INT_PA3.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'BENCH:R.1000');
  });

  describe('Test Step ID: 657452', function() {

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should type "Price" in Available section search box', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('price');

      // Verifying that "price is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'price') {
          expect(false).customError('"price" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Ending Price" from the "Available" list', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Ending Price').then(function(item) {
        item.select();
      });

      // Verifying if 'Ending Price' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Ending Price').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Ending Price" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Right" arrow button to add "Ending Price" to "Selected" list', function() {
      TileOptionsColumns.getArrowButton('right').click().then(function() {}, function() {

        expect(false).customError('Unable to on "Right" arrow button to add "Ending Price" to "Selected" list');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Ending Price" is added to the "Selected" list', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Ending Price') === -1) {
          expect(false).customError('"Ending Price" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 657453', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if red "X" icon appears top right in app toolbar', function() {
      element(by.xpath(PA3MainPage.xpathRefreshToCancelBtn)).isPresent().then(function() {}, function() {

        expect(false).customError('"X" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Refresh" icon is appeared', function() {
      PA3MainPage.getRefreshIcon().isPresent().then(function() {}, function() {

        expect(false).customError('"Refresh" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 657790', function() {

    var reports = ['Average Weight Difference', 'Weights', 'Top/Bottom 10 Contributors to Return'];
    var screenShot = 0;

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Characteristics Tilt', 'Refresh');

    it('Automation: Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Verifying if "Characteristics Tilt" is refreshing', function() {
      PA3MainPage.getReportCalculationDlg('Characteristics Tilt').isDisplayed().then(function(report) {
        if (!report) {
          expect(false).customError('"Characteristics Tilt" is not refreshing');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation: Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

    reports.forEach(function(report) {
      it('Verifying if ' + report + ' is not refreshing', function() {
        PA3MainPage.getReportCalculationDlg(report).isPresent().then(function(dialog) {
          if (dialog) {
            expect(false).customError(report + ' is refreshing');
            screenShot++;
          }
        });
      });

      if (screenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if red "X" icon appears top right in app toolbar', function() {
      element(by.xpath(PA3MainPage.xpathRefreshToCancelBtn)).isPresent().then(function() {}, function() {

        expect(false).customError('"X" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 657794', function() {

    var reports = ['Characteristics Tilt', 'Weights', 'Top/Bottom 10 Contributors to Return'];
    var screenShot = 0;

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    // To dismiss the wrench menu
    it('Should select "Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', '4 Tiles', '2 Grids, 2 Charts (Equal)').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Weights" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Average Weight Difference', 'Refresh');

    it('Automation: Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Verifying if "Average Weight Difference" is refreshing', function() {
      PA3MainPage.getReportCalculationDlg('Average Weight Difference').isDisplayed().then(function(report) {
        if (!report) {
          expect(false).customError('"Average Weight Difference" is not refreshing');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation: Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

    reports.forEach(function(report) {
      it('Verifying if ' + report + ' is not refreshing', function() {
        PA3MainPage.getReportCalculationDlg(report).isPresent().then(function(dialog) {
          if (dialog) {
            expect(false).customError(report + ' is refreshing');
            screenShot++;
          }
        });
      });

      if (screenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if red "X" icon appears top right in app toolbar', function() {
      element(by.xpath(PA3MainPage.xpathRefreshToCancelBtn)).isPresent().then(function() {}, function() {

        expect(false).customError('"X" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 657460', function() {

    var reports = ['Contribution', 'Weights', 'Detail Characteristics'];
    var screenShot = 0;

    // Select and verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', '4 Tiles', 'All Grids (3 Top, 1 Bottom)', true, 'isSelected');

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // Select options from wrench menu and select "Groupings" tab
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Summary Characteristics', 'Groupings');

    it('Should select "Asset Class" in the "Available" section after expanding "FactSet"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "Groupings" tab in "Tile Options - Summary Characteristics" LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Right" arrow button to add "Asset Class" to the "Selected" container', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {}, function() {

        expect(false).customError('Unable to on "Right" arrow button to add "Asset Class" to the "Selected"' + ' container');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Asset Class" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent()).toBeTruthy();
    });

    it('Automation: Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Summary Characteristics');

    it('Verifying if "Summary Characteristics" is re-calculating', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation: Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

    reports.forEach(function(report) {
      it('Verifying if ' + report + ' is not refreshing', function() {
        PA3MainPage.getReportCalculationDlg(report).isPresent().then(function(dialog) {
          if (dialog) {
            expect(false).customError(report + ' is refreshing');
            screenShot++;
          }
        });
      });

      if (screenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if red "X" icon appears top right in app toolbar', function() {
      element(by.xpath(PA3MainPage.xpathRefreshToCancelBtn)).isPresent().then(function() {}, function() {

        expect(false).customError('"X" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Refresh" icon is appeared', function() {
      PA3MainPage.getRefreshIcon().isPresent().then(function() {}, function() {

        expect(false).customError('"Refresh" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 657461', function() {

    it('Should click on "Refresh" icon in app toolbar', function() {
      browser.ignoreSynchronization = true;
      ThiefHelpers.getButtonClassReference('refresh').press();
    });

    var verifyIfLoadingSwrillIsDisplayed = function(reportName) {
      it('Wait for "' + reportName + '" to calculate', function() {
        // Verifying report is recalculating
        PA3MainPage.getReportCalculationDlg(reportName).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + reportName + '" report did not recalculate');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    };

    verifyIfLoadingSwrillIsDisplayed('Summary Characteristics');

    verifyIfLoadingSwrillIsDisplayed('Weights');

    verifyIfLoadingSwrillIsDisplayed('Detail Characteristics');

    verifyIfLoadingSwrillIsDisplayed('Contribution');

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if red "X" icon appears top right in app toolbar', function() {
      element(by.xpath(PA3MainPage.xpathRefreshToCancelBtn)).isPresent().then(function() {}, function() {

        expect(false).customError('"X" icon is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });
  });
});
