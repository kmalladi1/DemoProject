'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-ccid-ccd', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'available');
  var compositeComponentIDColData = [];
  var compositeComponentDescriptionColData = [];

  // Local Function(s)
  var verifyReportValues = function(reportName, rowName, colName, expectedValue) {
    var flag = 0;
    SlickGridFunctions.getElementsFromTree(reportName, '', rowName, '').then(function(elements) {
      elements.forEach(function(row) {
        SlickGridFunctions.getCellReference(reportName, row, '', colName).then(function(cellRef) {
          cellRef.getText().then(function(val) {
            if (val !== expectedValue) {
              flag = flag + 1;
              expect(false).customError(row + ', "' + colName + '" value does not contain Expected value "' + expectedValue + '", found: ' + val);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  };

  describe('Test Step ID: 703661', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Columns;CCID_Col;"', function() {
      PA3MainPage.switchToDocument('ccid-col');
    });

    it('Should wait for "Sector Weights - 3 Levels" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Sector Weights - 3 Levels'),
        90000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Sector Weights - 3 Levels" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sector Weights - 3 Levels" report is calculated', function() {
      PA3MainPage.isReportCalculated('Sector Weights - 3 Levels').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Sector Weights - 3 Levels" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Sector Weights - 3 Levels')).toBeTruthy();
          } else {
            expect(false).customError(err);
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

    it('Verify that "Sector Weights - 3 Levels" report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Sector Weights - 3 Levels').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Sector Weights - 3 Levels" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that the "Portfolio" widget displays "CLIENT:/PA3/COLUMNS/R200_SELECT.ACTM"', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(option) {
        if (option !== 'CLIENT:/PA3/COLUMNS/R200_SELECT.ACTM') {
          expect(false).customError('"CLIENT:/PA3/COLUMNS/R200_SELECT.ACTM" did not display in "Portfolio" widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Benchmark" widget displays value "RUSSELL:3000"', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'RUSSELL:3000') {
          expect(false).customError('"RUSSELL:3000" did not display in"Benchmark" widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "CONSUMER_STAPLES" grouping is displayed in the report under "Composite Component A > Consumers"', function() {
      SlickGridFunctions.getElementsFromTree('Sector Weights - 3 Levels', '', 'Composite Component  A|Consumers', '').then(function(elements) {
        if (elements.indexOf('CONSUMER_STAPLES') <= 0) {
          expect(false).customError('"CONSUMER_STAPLES" is not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should note "Composite Component ID" column data', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights - 3 Levels', 'Composite Component ID').then(function(values) {

        // Excluding "Consumer Staples" value
        values.splice(9, 1);
        compositeComponentIDColData = values;
      });
    });

    it('Should note "Composite Component Description" column data', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights - 3 Levels', 'Composite Component Description').then(function(values) {
        values.splice(9, 1);
        compositeComponentDescriptionColData = values;
      });
    });

  });

  describe('Test Step ID: 703663', function() {

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.selectWrenchIcon('Sector Weights - 3 Levels');
    });

    it('Should select "Options" from the wrench menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Options" from menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights - 3 Levels" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights - 3 Levels') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" tab from the LHP', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Exclusions" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Exclusions" tab is selected in LHP
      TileOptions.getLHPOption('Exclusions').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Exclusions" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Composite Component A>Consumers" from "Available" container double click on "CONSUMER_STAPLES"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Composite Component  A');

      // Expand "Composite Component A" from "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Consumers').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('CONSUMER_STAPLES').then(function(item) {
                  item.select();
                  item.doubleClick();
                });
              } else {
                expect(false).customError('"Consumers" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Composite Component A" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "CONSUMER_STAPLES" is added to selected section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Composite Components > Composite Components > Composite Components');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Composite Component  A > Consumers > CONSUMER_STAPLES') < 0) {
          expect(false).customError('"CONSUMER_STAPLES" is not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Sector Weights - 3 Levels" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Sector Weights - 3 Levels'),
        90000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Sector Weights - 3 Levels" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sector Weights - 3 Levels" report is calculated', function() {
      PA3MainPage.isReportCalculated('Sector Weights - 3 Levels').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Sector Weights - 3 Levels" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Sector Weights - 3 Levels')).toBeTruthy();
          } else {
            expect(false).customError(err);
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

    it('Verify that "CONSUMER_STAPLES" grouping is not displayed in the report under "Composite Component A > Consumers"', function() {
      SlickGridFunctions.getElementsFromTree('Sector Weights - 3 Levels', '', 'Composite Component  A|Consumers', '').then(function(elements) {
        if (elements.indexOf('CONSUMER_STAPLES') > 0) {
          expect(false).customError('"CONSUMER_STAPLES" is present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    it('Verify that "Excluded: CONSUMER_STAPLES" hyperlink is displayed in  the report', function() {
      PA3MainPage.getExclusionsHyperLink('Sector Weights - 3 Levels').getText().then(function(value) {
        if (value !== 'Excluded: CONSUMER_STAPLES') {
          flag = flag + 1;
          expect(false).customError('"Excluded: CONSUMER_STAPLES" is not present in the report');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying "Sector Weights - 3 Levels" reports are grouped by "Composite Components"', function() {
      PA3MainPage.getGroupingsHyperLink('Sector Weights - 3 Levels').getText().then(function(option) {
        if (option !== 'Composite Components') {
          flag = flag + 1;
          expect(false).customError('"Sector Weights - 3 Levels" reports are not grouped by "Composite Components"');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verify that "Composite Component ID" column data is same as data noted in previous step', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights - 3 Levels', 'Composite Component ID').then(function(values) {
        values.forEach(function(value, index) {
          if (value !== compositeComponentIDColData[index]) {
            flag = flag + 1;
            expect(false).customError('"Composite Component ID" column data is not same. Expected ' +
              '"' + compositeComponentIDColData[index] + '", Found ' + value);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify that "Composite Component Description" column data is same as data noted in previous step', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights - 3 Levels', 'Composite Component Description').then(function(values) {
        values.forEach(function(value, index) {
          if (value !== compositeComponentDescriptionColData[index]) {
            flag = flag + 1;
            expect(false).customError('"Composite Component Description" column data is not same. Expected ' +
              '"' + compositeComponentDescriptionColData[index] + '", Found ' + value);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 703686', function() {

    it('Should click on "Composite Components" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Sector Weights - 3 Levels').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Options" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" is not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Groupings" option is not selected from LHP');
        }
      });
    });

    var countBeforeRemove;
    it('Make a note of the number of the elements from "Selected" section', function() {
      TileOptionsGroupings.getAllElements('selected').count().then(function(count) {
        countBeforeRemove = count;
      });
    });

    it('Should click on "X" Icon for last 2 "Composite Components" elements to remove from list', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Composite Components').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Composite Components').click();
    });

    it(' Verifying if "Composite Components" is removed from Selected section', function() {
      TileOptionsGroupings.getAllElements('selected').count().then(function(count) {
        if (count !== countBeforeRemove - 2) {
          expect(false).customError('"Composite Components" is not removed from Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Can not able to click on OK button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Tile Options" mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Should wait for "Sector Weights - 3 Levels" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Sector Weights - 3 Levels'),
        90000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Sector Weights - 3 Levels" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sector Weights - 3 Levels" report is calculated', function() {
      PA3MainPage.isReportCalculated('Sector Weights - 3 Levels').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Sector Weights - 3 Levels" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Sector Weights - 3 Levels')).toBeTruthy();
          } else {
            expect(false).customError(err);
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

    it('Verifying if the securities under "Composite Component A" contains "CLIENT:/PA3/COLUMNS/CONS_EFIM.ACTM" for ' +
      '"Composite Component ID" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component  A', 'Composite Component ID', 'CLIENT:/PA3/COLUMNS/CONS_EFIM.ACTM');
    });

    it('Verifying if the securities under "Composite Component A" contains "Composite Component A" for ' +
      '"Composite Component Description" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component  A', 'Composite Component Description', 'Composite Component A');
    });

    it('Expand "Composite Component B" in the "Weights" Report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Sector Weights - 3 Levels', 'Composite Component B');

      // Verifying that "Composite Component B" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Sector Weights - 3 Levels', 'Composite Component B');
    });

    it('Verifying if the securities under "Composite Component B" contains "CLIENT:/PA3/COLUMNS/HITU.ACTM" for ' +
      '"Composite Component ID" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component B', 'Composite Component ID', 'CLIENT:/PA3/COLUMNS/HITU.ACTM');
    });

    it('Verifying if the securities under "Composite Component B" contains "Composite Component B" for ' +
      '"Composite Component Description" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component B', 'Composite Component Description', 'Composite Component B');
    });

    it('Expand "Composite Component C" in the "Weights" Report', function() {
      SlickGridFunctions.scrollCellIntoView('Sector Weights - 3 Levels', 'Composite Component C', '', 'Composite Component ID');

      PA3MainPage.expandTreeInCalculatedReport('Sector Weights - 3 Levels', 'Composite Component C');

      // Verifying that "Composite Component C" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Sector Weights - 3 Levels', 'Composite Component C');
    });

    it('Verifying if the securities under "Composite Component C" contains "CLIENT:/PA3/COLUMNS/REAL_ESTATE.ACCT" for ' +
      '"Composite Component ID" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component C', 'Composite Component ID', 'CLIENT:/PA3/COLUMNS/REAL_ESTATE.ACCT');
    });

    it('Verifying if the securities under "Composite Component C" contains "Composite Component C" for ' +
      '"Composite Component Description" column', function() {
      verifyReportValues('Sector Weights - 3 Levels', 'Composite Component C', 'Composite Component Description', 'Composite Component C');
    });

  });

});
