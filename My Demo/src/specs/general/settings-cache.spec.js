'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: settings-cache', function() {

  var time1;
  var time2;
  var time3;
  var time4;
  var time5;
  var time6;
  var storeTime1;
  var storeTime2;
  var storeTime3;

  describe('Test Step ID: 592121', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/General/SETTINGS_CACHE"', function() {
      // Calculating time before document loading
      time1 = new Date().getTime();

      PA3MainPage.launchHtmlDialogAndOpenDocument('settings-cache');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      time2 = new Date().getTime();
    });

    it('Should store time to take report calculation', function() {
      storeTime1 = time2 - time1;
    });

    it('Verifying if "Cache Report 1" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Cache Report 1').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Cache Report 1 report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "MSCI:EAFE"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'MSCI:EAFE') {
          expect(false).customError('Portfolio widget is not populated with "MSCI:EAFE"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "RUSSELL:3000"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:3000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:3000"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 592148', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    it('Should click on "Port. Average Weight" from Selected section to select', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Port. Average Weight').then(function(item) {
            item.select();

            // Check if element is selected
            item.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Port. Average Weight" did not selected from "Selected" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should click on up arrow button in Decimal spinner info box and set value as 4', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '4', false, true);
    });

    it('Verifying the value to "4" in decimal drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '4') {
          expect(false).customError('value not equal to "4" in decimal drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      time3 = new Date().getTime();
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      time4 = new Date().getTime();
    });

    it('Verifying if "Port. Average Weight" report column values are 4 decimal places for "MSCI EAFE" multiheader and "--" is displayed for "Miscellaneous"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(arr) {
        arr.forEach(function(rowName) {
          if (rowName !== 'Miscellaneous') {
            SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Port. Average Weight', 'MSCI EAFE').then(function(ref) {
              ref.getText().then(function(value) {
                var temp = value.split('.');
                if (temp[1].length !== 4) {
                  expect(false).customError('"Port. Average Weight" report column values did not 4 decimal places for "MSCI EAFE" multiheader');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Port. Average Weight', 'MSCI EAFE').then(function(ref) {
              ref.getText().then(function(value) {
                if (value !== '--') {
                  expect(false).customError('"Port. Average Weight" report column values did not display "--" but found: "' + value + '"');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    it('Should store time to take report calculation', function() {
      storeTime2 = time4 - time3;
    });

    it('Verifying if second report calculation time is less than first report calculation time', function() {
      if (storeTime2 > storeTime1) {
        expect(false).customError('Second report calculation time did not less than first report calculation time');
      }
    });
  });

  describe('Test Step ID: 592149', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should expand "Portfolio > Position Data" under "FactSet" from Available section and click on "Port. Ending Weight"', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      // Expand "FactSet" frm "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Portfolio').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Position Data').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Position Data" is not expanded');
                      CommonFunctions.takeScreenShot();
                    } else {
                      subGroup1.getItemByText('Port. Ending Weight').then(function(item) {
                        item.select();
                        item.doubleClick();
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Portfolio" is not expanded');
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

    it('Verifying if "Port. Ending Weight" is moved in to selected section', function() {
      // Verifying item is moved in to selected section
      TileOptionsColumns.getElementFromSelectedSection('Port. Ending Weight').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Port. Ending Weight" did not move in to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      time5 = new Date().getTime();
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      time6 = new Date().getTime();
    });

    it('Verifying if "Port. Ending Weight" column added in the report', function() {
      SlickGridFunctions.getColumnNames('Attribution').then(function(column) {
        if (column.indexOf('Port. Ending Weight') < 0) {
          expect(false).customError('"Port. Ending Weight" column did not display in report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Average Weight" report column values are 4 decimal places for "MSCI EAFE" multiheader and "--" is displayed for "Miscellaneous"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(arr) {
        arr.forEach(function(rowName) {
          if (rowName !== 'Miscellaneous') {
            SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Port. Average Weight', 'MSCI EAFE').then(function(ref) {
              ref.getText().then(function(value) {
                var temp = value.split('.');
                if (temp[1].length !== 4) {
                  expect(false).customError('"Port. Average Weight" report column values did not 4 decimal places for "MSCI EAFE" multiheader');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            SlickGridFunctions.getCellReference('Attribution', rowName, '', 'Port. Average Weight', 'MSCI EAFE').then(function(ref) {
              ref.getText().then(function(value) {
                if (value !== '--') {
                  expect(false).customError('"Port. Average Weight" report column values did not display "--" but found: "' + value + '"');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    it('Should store time to take report calculation', function() {
      storeTime3 = time6 - time5;
    });

    it('Verifying if third report calculation time is less than first report calculation time', function() {
      if (storeTime3 > storeTime1) {
        expect(false).customError('Second report calculation time did not less than first report calculation time');
      }
    });
  });
});
