'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-time-series-toggle', function() {

  describe('Test Step ID: 557194', function() {

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
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(option) {
        if (option !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"CLIENT:/PA3/TEST.ACCT" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Weights Report" calculates for "RUSSELL:1000" in "Benchmark" widget', function() {
      // Verifying value "RUSSELL:1000" in the "Benchmark" widget
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that refresh icon in the app toolbar is enabled', function() {
      ThiefHelpers.getButtonClassReference('refresh').isDisabled().then(function(isDisabled) {
        if (isDisabled) {
          expect(false).customError('Refresh icon in the app toolbar is not enabled');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 557199', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      // Clicking on "Wrench" button in the application toolbar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Format Options|Theme|Quartz" option from wrench menu drop down', function() {
      // Click on "Quartz" theme from format options
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying report theme as "Quartz"
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === 0) {
          expect(false).customError('Report theme is not "Quartz"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Dates" from LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying that view changed to "Dates"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select Report frequency as "Monthly",in "Tile Options - Weights" view', function() {
      //Select report frequency as 'Monthly' from drop down
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:', undefined, '');
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      // Clicking ok button in tile options
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //verifying tile options mode is closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Wait until spinner disappears', function() {
      //Wait until spinner disappears
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference());
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

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should right click on first "Port.Weight" column and select Custom Charts|Column from list appeared', function() {
      //Right click on the first "Port. Weight" column and select Column Charts|Column from list appeared
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight', '11/11/2015').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Column');
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

    it('Verifying that "Port. Weight" chart is loaded', function() {
      // Verify that "Port. Weight" chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557201', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on the grid icon available at the top in "Port. Weight" chart', function() {
      //Clicking on grid icon available at the top in "Port. Weight" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
        },

        function(err) {
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

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
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

  describe('Test Step ID: 557218', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Portfolio Weights" from the Chart icon drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Portfolio Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for loading spinner to appear', function() {
      browser.wait(function() {
        return element(by.xpath('//tf-progress-indicator')).isPresent().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 60000, 'Loading spinner did not appear').then(function(value) {
        if (!value) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that loading swirl is displayed', function() {
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until chart load', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while loading chart.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying that "Portfolio Weights" chart is loaded', function() {
      //Verifying Portfolio Weights chart is loaded
      PA3MainPage.isInChartFormat('Portfolio Weights').then(function(option) {
        if (option !== true) {
          expect(false).customError('Portfolio Weights chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557220', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on the grid icon available at the top in "Port. Weight" chart', function() {
      //Clicking on grid icon available at the top in "Portfolio Weights" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Portfolio Weights').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verify that loading swirl is displayed ', function() {
      //Verify that loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
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

  describe('Test Step ID: 557204', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should expand "Commercial Services" in Weights report', function() {
      //Expand Commercial Services in Weights report
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services', undefined, undefined);

      // waiting for expand action to takes place
      browser.sleep(5000);

      // Verifying if Commercial Services was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services');
    });

    it('Should right click on column header "Port.Weight" and select Custom charts|Bar from list appeared', function() {
      //Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Bar"
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Bar');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557207', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on the grid icon available at the top in "Port. Weight" chart', function() {
      //Clicking on grid icon available at the top in "Portfolio Weights" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verify that loading swirl is displayed', function() {
      // Verify loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying that weights report loaded with "Commercial Services" grouping expanded by default', function() {
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

      // Verifying "Commercial Services" grouping expanded by default
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services', undefined, true);
    });

  });

  describe('Test Step ID: 557208', function() {

    it('Should right click on column header "Port.Weight" and select "Custom Charts|Line" from list appeared', function() {
      // Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Line"
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight', '11/11/2015').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Line');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      //Verifying loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verifying that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557209', function() {

    it('Should click on the grid icon available at the top in "Port. Weight" chart', function() {
      //Clicking on grid icon available at the top in "Portfolio Weights" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying loading swirl is not displayed', function() {
      //Verifying loading swirl is not displayed
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

  describe('Test Step ID: 557210', function() {

    it('Should right click on column header "Port.Weight" and select "Custom Charts | Stacked Area" from list appeared', function() {
      // Right Click on "Port.Weight" column and from the 'Custom Charts' menu select "Stacked Area"
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight', '11/11/2015').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Stacked Area');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying loading swirl is not displayed', function() {
      //Verify loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verifying that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557211', function() {

    it('Should click on the grid icon available at the top in "Port. Weight" chart', function() {
      //Clicking on grid icon available at the top in "Portfolio Weights" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying loading swirl is not displayed', function() {
      // Verify loading swirl is not displayed
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

  describe('Test Step ID: 557251', function() {

    it('Should select "Attribution" in the LHP nave pane', function() {
      // Select "Attribution" in the LHP Nave Pane
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Attribution" report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Attribution" report from LHP is not selected');
              CommonFunctions.takeScreenShot();
            }
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
      });
    });

    it('Should click on the "Wrench" icon in the "Attribution" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Dates" from LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying that view changed to "Dates"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select Report frequency as "Monthly"', function() {
      // Select report frequency as 'Monthly' from drop down
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:', undefined, '');

      // Verifying if Monthly is selected from the dropdwn
      ThiefHelpers.verifySelectedDropDownText('Monthly', 'Report Frequency:');
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button at the top right corner', function() {
      // Clicking "OK" button at the top right corner
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //verifying tile options mode is closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that loading swirl is displayed', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference(), 180000);

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on chart icon and select "Attribution Over Time - 2 Factor" from the drop down', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference());

      // Clicking on chart icon
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // select "Attribution Over Time - 2 Factor" from the drop down
      PA3MainPage.getOptionFromWrenchMenu('Attribution Over Time - 2 Factor').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is displayed ', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying attribution Over Time - 2 Factor chart is loaded', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference());

      // Verify Attribution Over Time - 2 Factor' chart is loaded
      PA3MainPage.isInChartFormat('Attribution Over Time - 2 Factor').then(function(option) {
        if (option !== true) {
          expect(false).customError('Attribution Over Time - 2 Factor chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557253', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on the grid icon in "Attribution Over Time - 2 Factor" chart', function() {
      // Click on grid icon in Attribution Over Time - 2 Factor chart.
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Attribution Over Time - 2 Factor').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying loading swirl is displayed ', function() {
      // Verify loading swirl displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if "Attribution" report appeared without any errors', function() {
      //Verifying "Attribution" reports calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for attribution report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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

  describe('Test Step ID: 560263', function() {

    it('Should select "Multi-Horizon Returns" in the LHP', function() {
      // Select Multi-Horizon Returns in the LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Multi-Horizon Returns').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if 'Multi-Horizon Returns' report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Multi-Horizon Returns').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Multi-Horizon Returns" report from LHP is not selected');
            }
          }, function(err) {

            expect(false).customError(err);
          });
      });
    });

    it('Wait for "Multi-Horizon Returns" report to finish calculation', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Multi-Horizon Returns" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Multi-Horizon Returns').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Multi-Horizon Returns" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Multi-Horizon Returns')).toBeTruthy();
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

    it('Should click chart icon and select "Multi-Horizon Return"', function() {
      // In the Multi-Horizons Returns toolbar, click on chart icon
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Multi-Horizon Returns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select Multi-Horizon return
      PA3MainPage.getOptionFromWrenchMenu('Multi-Horizon Returns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed ', function() {
      // Verify loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verify that "Multi-Horizon Returns" chart is loaded', function() {
      // Verify that Multi-Horizon Returns chart is loaded
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(option) {
        if (option !== true) {
          expect(false).customError('Multi-Horizon Returns is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying Bars are displayed in the chart for different dates', function() {
      var bars = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').last().text();
        }).then(function(text) {
          var arr = [];
          var textSub;
          textSub = text.substr(-11);
          arr.push(textSub);
          if ((new Set(arr)).size !== arr.length) {
            expect(false).customError('Bars are not displayed in the chart for different dates');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(seriesCount) {
        if (seriesCount <= 1) {
          expect(false).customError('Multiple series are not displayed in the chart');
          CommonFunctions.takeScreenShot();
        } else {
          // Verifying bars are displayed in the chart for different dates
          for (var intCounterBars = 0; intCounterBars < seriesCount; intCounterBars++) {
            ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', intCounterBars);
            bars();
          }
        }

      });
    });

  });

  describe('Test Step ID: 557266', function() {

    it('Should click on grid icon in the "Multi-Horizon Returns" chart', function() {
      //Click on chart icon in the "Multi-Horizon Returns" chart
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Multi-Horizon Returns').click().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying loading swirl is not displayed', function() {
      // Verifying loading swirl is not displayed
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verifying that "Multi-Horizon Returns" report is loaded', function() {
      // Verifying "Multi-Horizon Returns" Report is calculated
      PA3MainPage.isReportCalculated('Multi-Horizon Returns').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Multi-Horizon Returns" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Multi-Horizon Returns')).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
