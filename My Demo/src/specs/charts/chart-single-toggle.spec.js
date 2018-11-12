'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-single-toggle', function() {

  describe('Test Step ID: 557402', function() {
    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "default_doc_auto"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Wait for weights report to finish calculation', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Weights Report" calculates for "CLIENT:/PA3/TEST.ACCT" in "Portfolio" widget', function() {
      // Verifying value "CLIENT:/PA3/TEST.ACCT" in the "Portfolio" widget
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(value) {
        if (value !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('" CLIENT:/PA3/TEST.ACCT" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Weights Report" calculates for "RUSSELL:1000" in "Benchmark" widget', function() {
      // Verifying value "RUSSELL:1000" in the "Benchmark" widget
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(value) {
        if (value !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557405', function() {

    it('Should click on the Chart icon in the "Weights" report', function() {
      //Clicking on Chart icon in "Weights" report
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying Charts Icon menu is displayed or not
      ThiefHelpers.isDropDownOpen().then(function(option) {
        if (!option) {
          expect(false).customError('Charts Icon menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Custom charts" option from drop down of charts', function() {
      //Clicking "Custom Charts" option from Charts drop down
      ThiefHelpers.getMenuClassReference(1).selectItemByText('Custom Charts').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying "Custom charts menu" is displayed or not
      ThiefHelpers.isDropDownOpen().then(function(option) {
        if (!option) {
          expect(false).customError('Custom charts menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Column" option from "Custom charts" drop down of charts', function() {
      //Selecting "Column" option from Custom charts drop down of charts
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Column').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      //verifying loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verify that "Port. Weight" chart is loaded', function() {
      //Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557406', function() {

    it('Should click on Grid icon in the "Port. Weight" chart', function() {
      //Clicking on grid icon
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      //verifying loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557407', function() {

    it('Should right click on column header "Port. Weight" and select "Custom charts|Bar" from list appeared', function() {
      //Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Bar".
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Bar');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      //Verifying loading swirl
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verify that "Port. Weight" chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Port. Weight" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557408', function() {

    it('Should click on Grid icon in the "Port.Weight" chart', function() {
      //Clicking on grid icon
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      //verifying loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557410', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should right click on column header "Port.Weight" and select "Custom charts|Line" from list appeared', function() {
      //Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Line".
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Line');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed ', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it(' Verify that "Port. Weight" chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557411', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on Grid icon in the "Port.Weight" chart', function() {
      //Clicking on grid icon in the "Port. Weights" Report
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557413', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should right click on column header "Port.Weight" and select "Custom charts|Stacked Area" from list appeared', function() {
      //Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Stacked Area".
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight', '').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Stacked Area');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it(' Verify that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Port. Weight" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557414', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on Grid icon in the "Port.Weight" chart', function() {
      //Clicking on grid icon
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();

      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557424', function() {

    it('Should select "Attribution" in LHP - Reports ', function() {
      //Click on "Attribution"  in LHP - Reports.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      //Waiting until Attribution reports calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 200000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Chart icon in the "Attribution" report', function() {
      //Clicking on Chart button in the "Attribution" report
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying Charts Icon menu is displayed or not
      ThiefHelpers.isDropDownOpen().then(function(option) {
        if (!option) {
          expect(false).customError('Charts Icon menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Performance" from chart drop down', function() {
      //Clicking "Performance" from Charts drop down
      ThiefHelpers.getMenuClassReference(1).selectItemByText('Performance').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it(' Verify that performance chart is loaded', function() {
      // Verify that performance chart is loaded
      PA3MainPage.isInChartFormat('Performance').then(function(option) {
        if (option !== true) {
          expect(false).customError('performance chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557425', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on Grid icon in "Performance" chart', function() {
      //Clicking on grid icon in "Performance" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Performance').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
