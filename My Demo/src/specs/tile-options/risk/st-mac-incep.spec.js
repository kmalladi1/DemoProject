'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-mac-incep', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 643716', function() {

    it('Should open PA3 Application with "Client:;Pa3;Risk;MAC_SIMULATION_STRESS"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mac-simulation-stress');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'BENCH:MLH0A0', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'SPN:SP50', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

  });

  describe('Test Step ID: 643717', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Verifying if "FactSet Multi-Asset Class Model (USD) - D:0.994, L:250-570 days" is displayed in ' +
      'Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('FactSet Multi-Asset Class Model (USD) - D:0.994, L:250-570 days') === -1) {
          expect(false).customError('"FactSet Multi-Asset Class Model (USD) - D:0.994, L:250-570 days" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Risk > Stress Tests" on the LHP of tile options', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Stress Tests', 'Risk').select();

      //Verifying if "Stress Tests" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Stress Tests', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Stress Tests" is not selected inside "Risk" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet > Monte Carlo Extreme Event Simulations" and select "9/11 Terrorist Attack (9/2001) - Sim" from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var subGroup = group.getGroupByText('Monte Carlo Extreme Event Simulations');
          subGroup.then(function(subGroupRef) {
            subGroupRef.expand();

            subGroupRef.isExpanded().then(function(expanded) {
              if (expanded) {
                var listItem = subGroupRef.getItemByText('9/11 Terrorist Attack (9/2001) - Sim');
                listItem.then(function(itemRef) {
                  itemRef.select();
                });
              }else {
                expect(false).customError('"Monte Carlo Extreme Event Simulations" is not expanded');
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

    it('Should click "right arrow" from the Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskStressTests.xpathTransferBox);
    });

    it('Should select "FactSet > Monte Carlo Extreme Event Simulations > Iraq War (3/2003) - Sim" ' +
      'from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.getGroupByText('Monte Carlo Extreme Event Simulations').then(function(subGroupRef) {
        subGroupRef.getItemByText('Iraq War (3/2003) - Sim').then(function(listItem) {
          listItem.select();
        });
      });
    });

    it('Should click "right arrow" from the Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskStressTests.xpathTransferBox);
    });

    var selectedItems = ['9/11 Terrorist Attack (9/2001) - Sim', 'Iraq War (3/2003) - Sim'];
    it('Verifying if "' + selectedItems + '" are added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        selectedItems.forEach(function(text) {
          if (myArray.indexOf(text) === -1) {
            expect(false).customError('"' + text + '" is not added to selected section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrMultiHeader = ['9/11 Terrorist Attack (9/2001) - Sim', 'Iraq War (3/2003) - Sim'];
    it('Verifying if "9/11 Terrorist Attack (9/2001) - Sim" and "Iraq War (3/2003) - Sim" are present as multi headers', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(function(refMultiheader) {
        arrMultiHeader.forEach(function(multiheader) {
          if (refMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"' + multiheader + '" did not display as multi header');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "ST % Value at Risk 1 Calendar Day, 95%" column is displayed under two multi headers', function() {
      arrMultiHeader.forEach(function(value, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
            // Verifying "ST % Value at Risk 1 Calendar Day, 95%" column is present in grouped multiheader
            if (arr[range[0]] !== 'ST % Value at Risk 1 Calendar Day, 95% ') {
              expect(false).customError('"ST % Value at Risk 1 Calendar Day, 95%" column did not present ' +
                'under "' + arrMultiHeader[index] + '"multi header.Found:"' + arr[range[0]] + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    var arrRowNames = [];
    it('Should get row names in the "Weights" report for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowNames) {
        rowNames.forEach(function(name) {
          arrRowNames.push(name);
        });
      });
    });

    var screenShot = 0;
    it('Verifying if "ST % Value at Risk 1 Calendar Day, 95%" column is empty for both multi headers', function() {
      arrMultiHeader.forEach(function(headerName) {
        arrRowNames.forEach(function(rowName) {
          SlickGridFunctions.getCellReference('Weights', rowName, '', 'ST % Value at Risk 1 Calendar Day, 95% ', headerName).then(function(ref) {
            ref.getText().then(function(ele) {
              if (ele !== '') {
                expect(false).customError('Values are seen in "ST % Value at Risk 1 Calendar Day, 95%" column ' +
                  'of "' + headerName + '" multi header. Found:"' + ele + '"');
                screenShot = 1;
                if (screenShot === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

  });

});
