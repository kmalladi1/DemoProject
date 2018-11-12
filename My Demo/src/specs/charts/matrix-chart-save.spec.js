'use strict';

require(__dirname + '/../../index.js');

var verifyMultilineChartHasAppeared = function(tileName) {
  it(`Should check if all the plots in the ${tileName} chart are line plots `, () => {

    ChartingUtilities.getIDsOfSeriesChildren('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(IDList => {
      var length = IDList.length;
      if (length <= 1) {
        expect(false).customError('displayed chart is not "MultiLine" Chart');
        CommonFunctions.takeScreenShot();
      }

      IDList.forEach((series) => {
        ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(style => {

          if (style !== 'Line') {
            expect(false).customError(`plot at ${series} in the chart is not line Found :` + style);
            CommonFunctions.takeScreenShot();
          }
        });

      });

    });
  });
};

describe('Test Case: matrix-chart-save', () => {

  describe('Test Step ID: 657806', () => {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Charts;FI Expandable Columns Charting" document', () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-expandable-columns-charting');
    });

    //Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('Weights');

    it('Should verify if a stacked chart has appeared', () => {
      ChartHelpers.getAttributeValue('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'IsStacked')
        .then(bool => {
          if (!bool) {
            expect(false).customError(`Stacked chart is not seen`);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    var options = ['Effective Duration Bin 1: > 7.0', 'Effective Duration Bin 2: 5.0 - 7.0', 'Effective Duration Bin 3: 3.0 - 5.0', 'Effective Duration Bin 4: 1.0 - 3.0', 'Effective Duration Bin 5: 0.0 - 1.0'];

    options.forEach((option) => {
      it(`Should verify if " ${option} " is selected in Interactive pane`, () => {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(option).isSelected().then((bool) => {
          if (!bool) {
            expect(false).customError(`${option} is not selected in Interactive Pane`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 684229', () => {
    it('Should click on grid icon in the Weights chart view ', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Weights').click();
    });

    it('Should click "Save Changes" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
    });

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on the column "1 Month" and hover over "Custom Charts" menu from Weights report, under "Port. Ending Partial Durations"', () => {

      SlickGridFunctions.getHeaderCellReference('Weights', '1 Month', 'Port. Ending Partial Durations')
        .then(ref => {
          PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts');
        });
    });

    var options = [];
    it('Should verify that "Matrix - Beta" and "Matrix (time series) - Beta" charts are listed in the right click menu', () => {
      PA3MainPage.getAllOptionsAfterRightClickOnReport('submenu')
        .then((elements) => {
          elements.forEach(element => {
            element.getText().then(text => options.push(text));
          });
        })
        .then(() => {
          if (!options.includes('Matrix - Beta') || !options.includes('Matrix (time series) - Beta')) {
            expect(false).customError('"Matrix - Beta" or "Matrix (time series) - Beta" is not seen in the submenu');
            CommonFunctions.takeScreenShot();
          }
        });
    });
  });

  describe('Test Step ID: 684230', () => {

    // should select option from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Projected Cash Flows', true, 'isSelected');

    //Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('30-DEC-2016');

    var groups = ['Electric', 'Energy', 'Natural Gas'];
    groups.forEach((group) => {
      it(`Should check if "${group}" is selected in Interactive Pane of "30-DEC-2016" chart`, () => {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(group).isSelected().then(bool => {
          if (!bool) {
            expect(false).customError(`"${group}" is not selected`);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

    it('Should check if "Energy" is Expanded by default in Interactive Pane of "30-DEC-2016" chart', () => {
      ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Energy').isExpanded().then(bool => {
        if (!bool) {
          expect(false).customError(`"Energy" is not expanded`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 684231', () => {
    it('Should click on grid icon in the "30-DEC-2016" chart view', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('30-DEC-2016').click();
    });

    it('Should click "Save Changes" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
    });

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on the column "30-DEC-2016" and hover over "Custom Charts" menu from Weights report, under "Port. Projected Total Cash Flow"  and select Custom Charts', () => {
      SlickGridFunctions.getHeaderCellReference('Weights', '30-DEC-2016', 'Port. Projected Total Cash Flow')
        .then(ref => {
          PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts');
        });
    });

    var flag = 0;
    it('Should verify that "Matrix (time series) - Beta" charts is listed in the right click menu', () => {

      PA3MainPage.getAllOptionsAfterRightClickOnReport('submenu').then(options => {
        options.forEach((option) => {
          option.getText().then(text => {
            if (text === 'Matrix (time series) - Beta') {
              flag = 1;
            }
          });
        });
      })
        .then(() => {
          if (flag !== 1) {
            expect(false).customError('"Matrix (time series) - Beta" is not seen in the submenu');
            CommonFunctions.takeScreenShot();
          }
        });
    });
  });

  describe('Test Step ID: 684232', () => {

    // should select option from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Projected Cash Flows Grouped Duration', true, 'isSelected');

    //Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('30-DEC-2016');

    it('Should verify if line plot has appeared in "30-DEC-2016" chart', () => {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(style => {
        if (style !== 'Line') {
          expect(false).customError(`plot is not line Found :` + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var options = ['Effective Duration Bin 1: > 7.0', 'Effective Duration Bin 2: 5.0 - 7.0', 'Effective Duration Bin 3: 3.0 - 5.0'];
    options.forEach((option) => {
      it(`Should Verify if " ${option} " is selected in Interactive pane in "30-DEC-2016" chart`, () => {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(option).isSelected().then((bool) => {
          if (!bool) {
            expect(false).customError(`${option} is not selected in Interactive Pane`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 684233', () => {

    it('Should click on grid icon in the "30-DEC-2016" chart view', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('30-DEC-2016').click();
    });

    it('Should click "Save Changes" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
    });

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on the column "30-DEC-2016" and hover over "Custom Charts" menu from Weights report, under "Port. Projected Interest  Cash Flow"', () => {
      SlickGridFunctions.getHeaderCellReference('Weights', '30-DEC-2016', 'Port. Projected Interest  Cash Flow')
        .then(ref => {
          PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts');
        });

    });

    var flag = 0;
    it('Should verify that "Matrix (time series) - Beta" charts is listed in the right click menu', () => {

      PA3MainPage.getAllOptionsAfterRightClickOnReport('submenu').then(options => {
        options.forEach((option) => {
          option.getText().then(text => {
            if (text === 'Matrix (time series) - Beta') {
              flag = 1;
            }
          });
        });
      })
        .then(() => {
          if (flag !== 1) {
            expect(false).customError('"Matrix (time series) - Beta" is not seen in the submenu');
            CommonFunctions.takeScreenShot();
          }
        });
    });
  });

  describe('Test Step ID: 684234', () => {

    // should select option from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Projected Cash Flows Multiple', true, 'isSelected');

    //Should verify if chart has appeared
    CommonPageObjectsForPA3.verifyChartHasAppeared('01-AUG-2016');

    it('Should verify if line plot has appeared in "01-AUG-2016" chart', () => {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(style => {
        if (style !== 'Line') {
          expect(false).customError(`plot is not line Found :` + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check if Energy is selected in Interactive Pane of "01-AUG-2016" chart', () => {
      ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Energy').isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`Energy is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 684235', () => {
    it('Should click on grid icon in the "01-AUG-2016" chart view', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('01-AUG-2016').click();
    });

    it('Should click "Save Changes" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
    });

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on the column "01-AUG-2016" and hover over "Custom Charts" menu from Weights report, under "Port. Projected Principal  Cash Flow"', () => {
      SlickGridFunctions.getHeaderCellReference('Weights', '01-AUG-2016', 'Port. Projected Principal Cash Flow')
        .then(ref => {
          PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts');
        });

    });

    var flag = 0;
    it('Should verify that "Matrix (time series) - Beta" charts is listed in the right click menu', () => {

      PA3MainPage.getAllOptionsAfterRightClickOnReport('submenu').then(options => {
        options.forEach((option) => {
          option.getText().then(text => {
            if (text === 'Matrix (time series) - Beta') {
              flag = 1;
            }
          });
        });
      })
        .then(() => {
          if (flag !== 1) {
            expect(false).customError('"Matrix (time series) - Beta" is not seen in the submenu');
            CommonFunctions.takeScreenShot();
          }
        });
    });
  });

  describe('Test Step ID: 684236', () => {

    // should select option from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Scenarios', true, 'isSelected');

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should verify if the header of the report is "FI Energy Test Account vs ICE BofAML U.S. Corporates Energy"', () => {
      PA3MainPage.getHeader().getText().then((header) => {
        if (header !== 'FI Energy Test Account vs ICE BofAML U.S. Corporates Energy') {
          expect(false).customError('Header is not FI Energy Test Account vs ICE BofAML U.S. Corporates Energy');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should verify if the tile name of the report is "Weights"', () => {

      PA3MainPage.getAllTilesFromReport().then(function(references) {
        references.forEach(function(ref) {
          ref.getText().then(function(tile) {
            if (tile !== 'Weights') {
              expect(false).customError('The tile name is not "Weights"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should verify if the report is grouped by "Class3"', () => {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(text => {

        if (text !== 'Class3') {
          expect(false).customError('The tile name is not "Weights"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var multis = ['Port. Horizon Effective Duration', 'Port. Horizon Total Return', 'Port. Horizon Yield'];
    it(`Should verify if the top level column headers for the report are ${multis}`, () => {

      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(headers => {

        multis.forEach(multi => {
          if (!headers.includes(multi)) {
            expect(false).customError(`${multi} is not present in not in multiheaders`);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });
  });

  describe('Test Step ID: 657807', () => {

    it('Should right click on a column header under Port Horizon Effective Duration > 3 Months section  and select Custom Charts > Matrix (time series) - Beta', () => {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Port. Horizon Effective Duration|3 Months').then((array) => {

        PA3MainPage.getAllColumnOfCalculatedReport('Weights').then(columns => {

          PA3MainPage.rightClickAndSelectOption(columns[array[0]], 'Custom Charts|Matrix (time series) - Beta');
        });
      });
    });

    //Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('All Curves Shift down 300 bps');

    verifyMultilineChartHasAppeared('All Curves Shift down 300 bps');

    it('Should check if Total is selected in Interactive Pane of "All Curves Shift down 300 bps" chart', () => {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Total').isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`Total is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 657808', () => {
    it('Should click on grid icon in the "All Curves Shift down 300 bps" chart view', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('All Curves Shift down 300 bps').click();
    });

    it('Should change the Chart Name to "Matrix_Save_Test" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Matrix_Save_Test');
    });

    it('Should click "Save Changes" in the "Chart has changed" pop up', () => {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
    });

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 657809', () => {
    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Select personal directory and enter the document name
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('Matrix_Save', undefined, true);

  });

  describe('Test Step ID: 657810', () => {
    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the required document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('Matrix_Save');

    // should select option from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Scenarios', true, 'isSelected');

    //Wait for the loading icon to disappear and verify if the given report is calculated.
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 657811', () => {
    it('Should click on chart icon available in the "Weights" report workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Matrix_Save_Test" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Matrix_Save_Test');
    });

    //Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('Matrix_Save_Test');

    verifyMultilineChartHasAppeared('Matrix_Save_Test');

    it('Should check if Total is selected in Interactive Pane', () => {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Total').isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`Total is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 657812', () => {
    it('Should click on grid icon in the "Matrix_Save_Test" chart view', () => {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Matrix_Save_Test').click();
    });

    it('Should verify if the tile switches back to the report grid without issue', () => {
      SlickGridFunctions.getGridReference('Weights').then(ref => {
        if (ref === undefined) {
          expect(false).customError(`Report grid is not found`);
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

});
