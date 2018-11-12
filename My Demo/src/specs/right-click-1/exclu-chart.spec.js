'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: exclu-chart', function() {

  describe('Test Step ID: 512529', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 512526', function() {

    it('Verifying that "Weights" Report is selected by default', function() {
      expect(PA3MainPage.getReports('Weights').getAttribute('class')).toContain('selected');
    });

    it('Enter "spn" in the "Portfolio" widget and select"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" ' + 'from type ahead', function() {
      PA3MainPage.setPortfolio('spn', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" is not selected from the ' + 'typeahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Russell:1000" in the "Benchmark" widget', function() {
      // Clear the widget if some text already exists
      PA3MainPage.getWidgetBox('Benchmark').clear();

      // Enter "Russell:1000" into the "Benchmark" widget
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);

      // Wait for "Benchmark" to be taken up
      browser.sleep(3000);
    });

    it('Verifying if "Weights" Report start calculation', function() {
      // Verifying Weights Report is Calculating and Displays Load Icon
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 120000);

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying that "Weights" report is calculated', function() {
      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 512527', function() {

    it('Should right click on "Commercial Services" in "Weights" report and select "Exclusions > Exclude Selected Rows" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Commercial Services') {
            PA3MainPage.rightClickAndSelectOption(element, 'Exclusions|Exclude Selected Rows');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Commercial Services') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Exclusions|Exclude Selected Rows');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Commercial Services" group is not present in the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(allColumnName) {
        if (allColumnName.indexOf('Commercial Services') < -1) {
          expect(false).customError('"Commercial Services" group is present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 512530', function() {

    it('Should click on Chart icon available in the "Weights" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "chart" icon from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Weights Difference" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Weights Difference').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights Difference" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights Difference" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(displayed) {
        expect(displayed).customError('"Weights Difference" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Weights Difference')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights Difference" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Commercial Services" is not displayed when hovered on the any bar', function() {
      var needScreenShot = 0;
      var tooltiText = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Commercial Services') > 0) {
            expect(false).customError('"Commercial Services" is displayed when hovered on bar');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        for (var i = 0; i < value; i++) {
          ChartingUtilities.hoverOnPixel('Series 1', i);
          tooltiText();
        }
      });
    });
  });
});
