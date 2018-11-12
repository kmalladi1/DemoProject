'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: autocalc-progress', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: Start Up', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);
  });

  describe('Test Step ID: 399966', function() {

    it('Should launch PA3 Application with "Client:/Pa3/report" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('report');
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'RUSSELL:3000');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'CLIENT:RUSSELL1000.ACCT');

    it('Verifying if Report "Header" is displayed with the "Portfolio" Name', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val !== 'Russell 3000') {
          expect(false).customError('Header value is not displayed with portfolio name, Expected:' + ' "Russell 3000" , Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });

      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = true;
    });
  });

  describe('Test Step ID: 399968', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Verifying Progress indicator is displayed', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Contribution'));

      // Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationDlg('Contribution').isDisplayed().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Progress Indicator is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying Progress indicator appears with "Initializing Calculation..."', function() {
      //Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationMessage('Contribution').getText().then(function(text) {
        if (text.indexOf('Initializing Calculation…') === -1) {
          expect(false).customError('"Initializing Calculation…" message is not appeared when report is loading');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying Progress indicator is not displaying percentage', function() {
      // Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationDlg('Contribution').getAttribute('progress').then(function(value) {
        if (value.indexOf('Percentage') !== -1) {
          expect(false).customError('Progress Indicator is displaying with percentage');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 399969', function() {

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Detailed Reports', 'Performance', true, 'isSelected');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Waiting until loading spinner appears', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Performance'), 30000);

      expect(PA3MainPage.getReportCalculationDlg('Performance').isPresent()).toBeTruthy();
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Portfolio', 'Prices', 'Document Options');

    it('Should un-check "Use Price Sources" checkbox under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').uncheck();

      // Verifying if Use Price Sources" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off ' + 'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Automation Task: Ignoring synchronization after handling Refresh button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });

    it('Verifying if Report stops loading', function() {
      PA3MainPage.getReportCalculationDlg().isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('Report does not stops loading');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Verifying Progress message is not appeared', function() {
      //Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationMessage('Performance').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Progress message appears in the "Performance" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Performance" Report is blank', function() {
      PA3MainPage.isReportCalculated('Performance', true).then(function(found) {
        if (found) {
          expect(false).customError('"Performance" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });
  });

  describe('Test Step ID: 399970', function() {

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Detailed Reports', 'Characteristics - Summary', true, 'isSelected');

    it('Automation Task: Ignoring synchronization to handle Refresh button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = true;
    });

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    it('Waiting until loading spinner appears', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 30000);

      // Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isDisplayed().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Progress Indicator is not displayed in "Characteristics - Summary" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh button(Enabling wait for angular)', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Characteristics - Summary');
  });

  describe('Test Step ID: 399972', function() {

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Detailed Reports', 'Multi-Horizon Returns', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Multi-Horizon Returns');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Multi-Horizon Returns', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Should select "Finance" from "Available section"', function() {
      // Select "Finance" from the Available Section.
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Finance');
      group.select();

      // Verifying if "Finance" is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Finance" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Finance" is added to "Selected" section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Economic Sector');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Finance') === -1) {
          expect(false).customError('"Finance" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Multi-Horizon Returns');

    it('Verifying if report recalculates', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Multi-Horizon Returns'), 30000);

      // Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationDlg('Multi-Horizon Returns').isDisplayed().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Progress Indicator is not displayed in "Multi-Horizon Returns" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh button(Enabling wait for angular)', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Multi-Horizon Returns');

    it('Verifying if "Excluded: Finance" hyperlink is displayed in "Multi-Horizon Returns" report', function() {
      // Verifying that Hyperlink name is "Excluded: Finance"
      PA3MainPage.getExclusionsHyperLink('Multi-Horizon Returns').getText().then(function(text) {
        if (text.indexOf('Excluded: Finance') === -1) {
          expect(false).customError('"Excluded: Finance" is not displayed in the "Multi-Horizon Returns"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Finance" is displayed in "Multi-Horizon Returns" report', function() {
      //Verifying "Finance"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Multi-Horizon Returns', '', '').then(function(cols) {
        if (cols.indexOf('Finance') !== -1) {
          expect(false).customError('"Finance" is present in the columns');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = true;
    });
  });

  describe('Test Step ID: 399974', function() {

    // select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Detailed Reports', 'Top/Bottom 5 Contributors', true, 'isSelected');

    it('Waiting until loading spinner appears', function() {
      // Waiting until loading icon appears
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Top/Bottom 5 Contributors'))).toBeTruthy();
    });

    it('Should click on the "Wrench" button" on the application toolbar', function() {
      //Clicking the wrench Icon button on application tool bar
      PA3MainPage.getWrenchIcon().click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        // Verifying if drop down menu appears.
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var optionsArr = ['Print', 'Download', 'Download All'];
    var flag = 0;
    optionsArr.forEach(function(option) {
      it('Verifying if "' + option + '" option from "Wrench drop down" on the application toolbar', function() {
        //Clicking on "Documents Options" in wrench dropdown from application tool bar
        PA3MainPage.getOptionFromWrenchMenu(option).getAttribute('class').then(function(attr) {
          if (attr.indexOf('disabled') === -1) {
            flag = flag + 1;
            expect(false).customError(option + 'is not disabled');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Automation Task: Ignoring synchronization after handling Refresh button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });
  });

  describe('Test Step ID: 399976', function() {

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    // Verifying if "Performance" report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Detailed Reports', 'Weights', true, 'isSelected');

    it('Verifying if "Weights" report is displayed with 3 tiles', function() {
      var allTiles = PA3MainPage.getAllTilesFromReport();
      allTiles.count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('"Weights" report is not displayed with 3 tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" Report is blank', function() {
      PA3MainPage.isReportCalculated('Contribution', true).then(function(found) {
        if (found) {
          expect(false).customError('"Contribution" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Verifying if "Weights" Report is blank', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (found) {
          expect(false).customError('Report "Weights" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Verifying if "Performance" Report is blank', function() {
      PA3MainPage.isReportCalculated('Performance', true).then(function(found) {
        if (found) {
          expect(false).customError('Report "Performance" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Automation Task: Ignoring synchronization to handle Cancel button', function() {
      browser.ignoreSynchronization = true;
    });
  });

  describe('Test Step ID: 399977', function() {

    var reports = ['Weights', 'Performance', 'Contribution'];
    var screenShot = 0;

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Waiting until loading spinner appears', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 30000);
    });

    reports.forEach(function(report) {
      it('Verifying if ' + report + ' is refreshing', function() {
        PA3MainPage.getReportCalculationDlg(report).isDisplayed().then(function(report) {
          if (!report) {
            expect(false).customError(report + ' is not refreshing');
            CommonFunctions.takeScreenShot();
          }
        });

        if (screenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cancel" button in "Contribution" report while reloading/refreshing', function() {
      PA3MainPage.cancelReportCalculation('Contribution').then(function(button) {
        if (!button) {
          expect(false).customError('Unable to click on "Cancel" button in "Contribution" report while ' + 'reloading/refreshing');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report stops loading', function() {
      PA3MainPage.getReportCalculationDlg('Contribution').isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('"Contribution" report does not stops loading');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Verifying if "Contribution" Report is blank', function() {
      PA3MainPage.isReportCalculated('Contribution', true).then(function(found) {
        if (found) {
          expect(false).customError('"Contribution" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {});
    });

    it('Automation Task: Ignoring synchronization after handling Cancel button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    it('Automation Task: Ignoring synchronization to handle Cancel button', function() {
      browser.ignoreSynchronization = true;
    });
  });

  describe('Test Step ID: 399978', function() {

    it('Should click on "Refresh" icon in app toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Verifying Progress indicator is displayed', function() {
      // Waiting until loading icon appears
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Contribution'));

      // Verifying loading swirl is displayed
      PA3MainPage.getReportCalculationDlg('Contribution').isDisplayed().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Progress Indicator is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization after handling Cancel button', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });
});
