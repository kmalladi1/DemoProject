'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-var-histogram', function() {

  describe('Test Step ID: 571104', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto" document', function() {
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

  });

  describe('Test Step ID: 571105', function() {

    var ddElementsArry = ['Portfolio Weights', 'Weights Difference', 'Weights Over Time', 'Benchmark Weights',
      'Custom Charts',];
    var print = 0;

    it('Verifying if "Weights" report is appeared', function() {

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Chart icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Chart" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Chart icon menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list not displayed after clicking on "Chart" icon from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying count of elements in the "chart" icon menu', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        if (ddElements.length !== 5) {
          expect(false).customError('Chart icon menu displays "' + ddElements.length + '" options instead' +
            ' of "5" options');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "chart icon" menu displays "Portfolio Weights", "Benchmark Weights", "Weights Over Time", ' +
      '"Weights Difference", "Custom Charts"', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        ddElementsArry.forEach(function(element) {
          var count = 0;
          for (var i = 0; i < ddElementsArry.length; i++) {
            if (element === ddElements[i]) {
              count++;
            }
          }

          if (count === 0) {
            print++;
            expect(false).customError(element + ' is not available in the drop down list ');
            if (print === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

  });

  describe('Test Step ID: 571110', function() {

    var count = 0;

    it('Should click on "wrench" icon and verify if wrench menu appeared and select "Options" from wrench menu ' +
      'list', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' +
              'application toolbar.');
            CommonFunctions.takeScreenShot();
          } else {
            PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
              },

              function() {
                expect(false).customError('Unable to click on "Options" menu item');
                CommonFunctions.takeScreenShot();
              });
          }
        });
      }, function() {

        expect(false).customError('unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" fromm LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Columns" from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not displayed in workspace');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet >Monte Carlo Risk > Simulation Statistics > Percent Statistics" from' +
      ' "Available" container and double click on "MC % Value at Risk #VD #VT Day,  #VC% #VA" list', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Monte Carlo Risk').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio Absolute Risk').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getGroupByText('Percent Statistics').then(function(subGroup2) {
                        subGroup2.expand();
                        subGroup2.isExpanded().then(function(expanded) {
                          if (expanded) {
                            subGroup2.getGroupByText('Value At Risk').then(function(subGroup3) {
                              subGroup3.expand();
                              subGroup3.isExpanded().then(function(expanded) {
                                if (expanded) {
                                  subGroup3.getItemByText('MC % Value at Risk #VD #VT Day,  #VC% #VA').then(function(item) {
                                    item.select();
                                    item.doubleClick();
                                  });
                                } else {
                                  expect(false).customError('"Value At Risk " is not expanded');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
                            });
                          } else {
                            expect(false).customError('"Percent Statistics " is not expanded');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"Portfolio Absolute Risk" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Monte Carlo Risk" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "MC % Value at Risk #VD #VT Day,  #VC% #VA" is added to the "Selected" list', function() {
      TileOptionsColumns.getElementFromSelectedSection('MC % Value at Risk #VD #VT Day, #VC% #VA').isPresent().then(function(bool) {
        if (bool === false) {
          expect(false).customError('"MC % Value at Risk #VD #VT Day, #VC% #VA" is not added to ' +
            'selected container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if Weights report recalculated and column "MC %Value at Risk1 Trading Day, 95%" is displayed in ' +
      'the recalculated report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(element) {
        //Utilities.scrollElementToVisibility( element );
        element.forEach(function(columns) {
          var columnName = columns.replace(/\n/g, ' ');
          if (columnName === 'MC % Value at Risk 1 Trading Day, 95% ') {
            count++;
          }
        });

        if (count !== 1) {
          expect(false).customError('"MC % Value at Risk 1 Trading Day, 95%" not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('test Step ID: 571109', function() {

    var revAnnotationsArry = [];
    var annotationsArry = ['99%', '95%', '90%', '50%'];
    var print = 0;

    ChartingUtilities.selectChartFromReport('Weights', '% VAR Histogram');

    it('Verifying if "Weights" report is calculated without any error', function() {

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "% VAR Histogram"' +
          ' report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch annotations from "% VAR Histogram" chart', function() {
      ChartHelpers.getAnnotationsText('.pa-chart-non-formatting-mode', '$fdsChartController',
        'SERIES_ANNOTATIONS_SERIES0').then(function(arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
          var temp = arr[i].split('\n');
          revAnnotationsArry.push(temp[0]);
        }
      });
    });

    it('Verifying if "% VAR Histogram" chart is displayed with four annotations "99%", "95%", "90%", ' +
      '"50%"(from left to right)', function() {
      if (revAnnotationsArry.length !== 4) {
        expect(false).customError('Chart is displays with "' + revAnnotationsArry.length + '" annotations instead of' +
          ' "4" annotations');
        CommonFunctions.takeScreenShot();
      }

      annotationsArry.forEach(function(element) {
        var count = 0;
        for (var i = 0; i < annotationsArry.length; i++) {
          if (element === revAnnotationsArry[i]) {
            count++;
          }
        }

        if (count === 0) {
          print++;
          expect(false).customError(element + ' annotation is not displayed');
          if (print === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

  });

  describe('Test Step ID: 571106', function() {

    it('Should click on "Wrench" icon', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('% VAR Histogram').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Wrench" icon in report work space');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Chart icon menu list displayed', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list is not displayed after clicking on "Wrench" icon in report work space');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Edit Chart" option is not listed in wrench menu list', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        ddElements.forEach(function(items) {
          if (items === 'Edit Chart') {
            expect(false).customError('"Edit Chart" menu item is appeared in the wrench menu list');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

});
