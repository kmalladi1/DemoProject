'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-blasting-charts', function() {

  describe('Test Step ID: 685309', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;PA3;Dates;DATES_BLAST_CHARTS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('dates-blasting-charts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the groupings hyperlink is "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('Grouping hyperlink is not "Economic Sector"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 685306', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights Difference Chart', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Weights Difference Chart');

    it('Verifying if the report displays four tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('The report is not displaying four tiles; Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrReports = ['Weights', 'Attribution'];
    arrReports.forEach(function(report) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);

    });

    var arrCharts = ['Performance Chart', 'Weights Difference Chart'];
    arrCharts.forEach(function(chart) {
      CommonPageObjectsForPA3.verifyIfChartIsDisplayed(chart);
    });

  });

  describe('Test Step ID: 685310', function() {

    var arrReports = [{reportName: 'Weights', endDate: '5/09/2014'}, {
      reportName: 'Weights Difference Chart',
      endDate: '6/10/2014',
    },];

    arrReports.forEach(function(report) {

      CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption(report.reportName, 'Options');

      it('Verifying if view changed to "Tile Options - ' + report.reportName + '" mode', function() {
        ThiefHelpers.isModeBannerDisplayed('Tile Options - ' + report.reportName).then(function(found) {
          if (!found) {
            expect(false).customError('View is not displayed as "Tile Options - ' + report.reportName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should set "' + report.endDate + '" into the "End Date" field', function() {
        ThiefHelpers.getTextBoxClassReference('End Date:').setText(report.endDate);

        // Adding wait time as per the Engineer comment in RPD:41035011
        browser.sleep(1000);

        ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(date) {
          if (date !== report.endDate) {
            expect(false).customError('"' + report.endDate + '" did not present in the "End Date" field. Found:"' + date + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Click on "OK" button of header and verify if "options" view is closed
      CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');
    });

    var arrReports1 = [{reportName: 'Performance Chart', startDate: '5/30/2013', endDate: '6/30/2014'}, {
      reportName: 'Attribution', startDate: '6/12/2014', endDate: '6/30/2014',},];

    arrReports1.forEach(function(report) {

      CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption(report.reportName, 'Options');

      it('Verifying if view changed to "Tile Options - ' + report.reportName + '" mode', function() {
        ThiefHelpers.isModeBannerDisplayed('Tile Options - ' + report.reportName).then(function(found) {
          if (!found) {
            expect(false).customError('View is not displayed as "Tile Options - ' + report.reportName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should set "' + report.startDate + '" into the "Start Date" field', function() {
        ThiefHelpers.getTextBoxClassReference('Start Date:').setText(report.startDate);

        ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(date) {
          if (date !== report.startDate) {
            expect(false).customError('"' + report.startDate + '" did not present in the "Start Date" field. Found:"' + date + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should set "' + report.endDate + '" into the "End Date" field', function() {
        ThiefHelpers.getTextBoxClassReference('End Date:').setText(report.endDate);

        // Adding wait time as per the Engineer comment in RPD:41035011
        browser.sleep(1000);

        ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(date) {
          if (date !== report.endDate) {
            expect(false).customError('"' + report.endDate + '" did not present in the "End Date" field. Found:"' + date + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Click on "OK" button of header and verify if "options" view is closed
      CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

      it('Waiting for the report to calculate', function() {
        expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
      });

    });

    it('Should click on "Refresh" Button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshBtn).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var reports = [{name: 'Weights', date: '5/09/2014'}, {name: 'Attribution', date: '6/12/2014 - 6/30/2014'}];

    reports.forEach(function(report) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report.name);

      it('Verifying if date hyperlink is set to "' + report.date + '" for "' + report.name + '" report', function() {
        PA3MainPage.getDateHyperLink(report.name).getText().then(function(text) {
          if (text !== report.date) {
            expect(false).customError('Date hyperlink did not set to "' + report.date + '" for "' + report.name + '" report; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var chartsViews = [{name: 'Weights Difference Chart', date: '6/10/2014'},
    {name: 'Performance Chart', date: '5/30/2013 - 6/30/2014'},];

    chartsViews.forEach(function(chart) {

      CommonPageObjectsForPA3.verifyIfChartIsDisplayed(chart.name);

      it('Verifying if date hyperlink is set to "' + chart.date + '" for "' + chart.name + '" report', function() {
        PA3MainPage.getDateHyperLink(chart.name).getText().then(function(text) {
          if (text !== chart.date) {
            expect(false).customError('Date hyperlink did not set to "' + chart.date + '" for "' + chart.name + '" report; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 685311', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights Difference Chart', 'Options');

    it('Verifying if view changed to "Tile Options - Weights Difference Chart" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights Difference Chart').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Weights Difference Chart".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights Difference Chart" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights Difference Chart').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights Difference Chart" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Weights Difference Chart" in "Apply To Weights Difference Chart" drop down', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').toggleExpandedState();
        }
      });
    });

    var checkListItems = ['Performance Chart', 'Weights'];

    checkListItems.forEach(function(item) {
      it('Should check "' + item + '"', function() {
        var group = ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart');
        group.getText().then(function(text) {
          if (text === 'Weights Difference Chart') {
            group.getItemByText(item).toggle();
          } else {
            expect(false).customError('"Weights Difference Chart" check list is not found.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if "' + item + '" is checked off', function() {
        // Verifying if the checkbox is checked
        var checklistItem = ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').getItemByText(item);
        checklistItem.getText().then(function(text) {
          if (text === item) {
            checklistItem.isChecked().then(function(checked) {
              if (!checked) {
                expect(false).customError('"' + item + '" check list item is unchecked');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError('"' + item + '" check list item is not found');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Attribution" checklist item is grayed out', function() {
      var item = ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').getItemByText('Attribution');
      item.getText().then(function(text) {
        if (text === 'Attribution') {
          ThiefHelpers.getDisableableClassReference(item).isDisabled().then(function(disabled) {
            if (!disabled) {
              expect(false).customError('"Attribution" is not grayed out');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Attribution" is not found in the "Apply To Multiple Reports" drop down.Found' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" checklist item is unchecked', function() {
      var item = ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').getItemByText('Attribution');
      item.isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Attribution" under "Weights Difference Chart" group is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 685312', function() {

    it('Should click "OK" in the blasting menu', function() {
      var xpath = TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    it('Should click on "Refresh" Button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshBtn).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrReports = ['Weights', 'Attribution'];
    arrReports.forEach(function(report) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);
    });

    var arrCharts = ['Performance Chart', 'Weights Difference Chart'];
    arrCharts.forEach(function(chart) {

      CommonPageObjectsForPA3.verifyIfChartIsDisplayed(chart);
    });

    it('Verifying if end date in date hyperlink is set to "6/10/2014" for "Performance Chart" report', function() {
      PA3MainPage.getDateHyperLink('Performance Chart').getText().then(function(text) {
        // Spliting Start and End Date
        var temp = text.split('-');

        // Replacing space from Start Date
        var endDate = temp[1].replace(' ', '');

        if (endDate !== '6/10/2014') {
          expect(false).customError('Date hyperlink did not set to "6/10/2014" for "Performance Chart" report; Found: ' + endDate);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var reports = ['Weights', 'Weights Difference Chart'];
    reports.forEach(function(report) {
      it('Verifying if date hyperlink is set to "6/10/2014" for "' + report + '" report', function() {
        PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
          if (text !== '6/10/2014') {
            expect(false).customError('Date hyperlink did not set to "6/10/2014" for "Weights" report; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if date hyperlink is set to "6/12/2014 - 6/30/2014" for "Attribution" report', function() {
      PA3MainPage.getDateHyperLink('Attribution').getText().then(function(text) {
        if (text !== '6/12/2014 - 6/30/2014') {
          expect(false).customError('Date hyperlink did not set to "6/12/2014 - 6/30/2014" for "Attribution" report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 685313', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Weights".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Weekly" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Weekly', 'Report Frequency:');
    });

    it('Verifying if the "Report Frequency" is set to "Weekly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Weekly') {
          expect(false).customError('"Report Frequency" is not set to "Weekly"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "2/10/2014" in the "Start Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('2/10/2014');

      // Verifying if "2/10/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '2/10/2014') {
          expect(false).customError('"Start Date" is not set to "2/10/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "7/02/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('6/16/2014');

      // Verifying if "6/16/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '6/16/2014') {
          expect(false).customError('"End Date" is not set to "6/16/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Weights" hyperlink');
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

    it('Should click on "+" button to expand "Weights Difference Chart" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').toggleExpandedState();
        }
      });
    });

    it('Should check "Performance Chart" item under "Weights Difference Chart" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').getItemByText('Performance Chart').toggle();

      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights Difference Chart').getItemByText('Performance Chart').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Performance Chart" item under "Weights Difference Chart" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
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

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrCharts = ['Performance Chart', 'Weights Difference Chart'];
    arrCharts.forEach(function(chart) {
      CommonPageObjectsForPA3.verifyIfChartIsDisplayed(chart);
    });

    var arrReports = ['Weights', 'Attribution'];
    arrReports.forEach(function(report) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);

    });

    var arrReport = ['Weights', 'Performance Chart'];
    arrReport.forEach(function(report) {
      it('Verifying if date hyperlink is set to "2/10/2014 - 6/16/2014" for "' + report + '" report', function() {
        PA3MainPage.getDateHyperLink(report).getText().then(function(text) {
          if (text !== '2/10/2014 - 6/16/2014') {
            expect(false).customError('Date hyperlink did not set to "2/10/2014 - 6/16/2014" for "' + report + '" report; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 685308', function() {

    it('Should close PA3 application', function() {
      // After completing all the test steps protractor will close the browser automatically
      expect(true).toBeTruthy();
    });

  });

});
