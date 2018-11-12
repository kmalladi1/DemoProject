'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-adr-parent', function() {

  describe('Test Step ID: Startup Instructions', function() {

    it('Should launch the PA3 application with "DEFAULT" document', function() {
      PA3MainPage.goToURL('#/doc/PA_DOCUMENTS:DEFAULT/report/report0');

      // Check if application is launched
      browser.getTitle().then(function(title) {
        expect(title === PA3Json.defaultDocument).customError('Title of browser did not match. ' + 'Expected: "' + PA3Json.defaultDocument + '", Found: "' + title + '"');
        if (title !== PA3Json.defaultDocument) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 486215', function() {

    it('Should launch the PA3 application with "AUO_CONV_2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-conv-2');
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupings = ['Equity Common', 'Long', 'Short', 'Equity Option: Call', 'Equity Option: Put', 'Exchange Traded Fund', 'Index Future', 'Metal Future', '[Cash]', '[Cash]', '[Cash]'];
    var marketValues = ['19,893,674.35', '21,574,441.03', '-1,680,766.68', '-301,580.45', '175,580.67', '1,649,313.468', '-357,052,000.0', '5,628,662,750.0', '-791,547.061', '-791,547.061', '-791,547.061'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        col.splice(11, 3);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        browser.driver.executeScript(function(value, index) {
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

          var dataObj;
          slickObject.grid.getData().getItems().forEach(function(dataItem, dataIndex) {
            if (dataItem[1] === value && dataIndex === index + 1) {
              dataObj = dataItem;
            }
          });

          return dataObj;
        }, value, index).then(function(value) {
          if (value !== undefined) {
            if (value.hasChildren === false || value.hasChildren === undefined) {
              expect(false).customError('"' + value[1] + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 486216', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupings = ['Equity Common', 'Long', 'Short', 'Equity Option: Call', 'Equity Option: Put', 'Exchange Traded Fund', 'Index Future', 'Metal Future'];
    var marketValues = ['19,893,674.35', '21,574,441.03', '-1,680,766.68', '-301,580.45', '175,580.67', '1,649,313.468', '-3,570,520.0', '6,659,755.0'];
    var groupingNames;

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        browser.driver.executeScript(function(value, index) {
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

          var dataObj;
          slickObject.grid.getData().getItems().forEach(function(dataItem, dataIndex) {
            if (dataItem[1] === value && dataIndex === index + 1) {
              dataObj = dataItem;
            }
          });

          return dataObj;
        }, value, index).then(function(value) {
          if (value !== undefined) {
            if (value.hasChildren === false || value.hasChildren === undefined) {
              expect(false).customError('"' + value[1] + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + marketValues[index] + '" value is present against "' + value + '" grouping' + ' in the "Weights" report', function() {
        SlickGridFunctions.getCellReference('Weights', value, '', 'Port. Ending Market Value', undefined).then(function(ref) {
          ref.getText().then(function(portValue) {
            if (parseFloat(portValue).toFixed(2) !== parseFloat(marketValues[index]).toFixed(2)) {
              expect(false).customError('"' + marketValues[index] + '" value did not display ' + 'against "' + value + '" grouping in the "Weights" report; Found: ' + portValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 486217', function() {

    it('Should click on the "Hamburger" icon next to "account lookup"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click();
    });

    it('Verifying if the drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "ADR_GDR" from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'ADR_GDR').click();
    });

    it('Should click "OK" in the "Accounts" drop down to exit', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "OK" from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: http://is.factset.com/rpd/Summary.aspx?messageId=27835697
    var groupings = ['ADR/GDR', 'Equity Common', 'Long', '[Cash]', '[Cash]', '[Cash]'];
    var groupingNames;var marketValues = ['3,995,040.06', '68,181,096.02', '68,181,096.02', '1,041,677.00', '1,041,677.00', '1,041,677.00'];

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        col.splice(6, 4);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        browser.driver.executeScript(function(value, index) {
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

          var dataObj;
          slickObject.grid.getData().getItems().forEach(function(dataItem, dataIndex) {
            if (dataItem[1] === value && dataIndex === index + 1) {
              dataObj = dataItem;
            }
          });

          return dataObj;
        }, value, index).then(function(value) {
          if (value !== undefined) {
            if (value.hasChildren === false || value.hasChildren === undefined) {
              expect(false).customError('"' + value[1] + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if the "Groupings" and "Port. Ending Market values" are set as expected', function() {
      browser.driver.executeScript(function() {
        var elements = [];
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

        for (var i = 1; i < slickObject.grid.getDataLength(); i++) {
          elements.push(slickObject.grid.getDataItem(i));
        }

        return elements;
      }).then(function(values) {
        values.forEach(function(col, index) {
          if (col.haschildren === false && col[1] !== groupings[index] && col[2] !== marketValues[index]) {
            expect(false).customError('"' + col[1] + '" grouping did not contain "Port. Ending Market' + ' value" as "' + marketValues[index] + '"; Found: ' + col[2]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 486218', function() {

    it('Should click on the wrench icon in the app tool bar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Document Options" from the app tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Document Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add/Remove" in the "Asset Type" section of LHP', function() {
      DocumentOptions.getLHPOption('Add/Remove').click().then(function() {}, function() {

        expect(false).customError('Unable to click on "Add/Remove" from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should uncheck "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').uncheck();
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if the "Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Weights" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: http://is.factset.com/rpd/Summary.aspx?messageId=27835697
    var groupings = ['ADR/GDR', 'Equity Common', 'Long', '[Cash]', '[Cash]', '[Cash]'];
    var groupingNames;var marketValues = ['3,995,040.06', '68,181,096.02', '68,181,096.02', '1,041,677.00', '1,041,677.00', '1,041,677.00'];

    it('Should record all the groupings in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        col.splice(6, 4);
        groupingNames = col;
      });
    });

    groupings.forEach(function(value, index) {

      it('Verifying if "' + value + '" grouping is present in the "Weights" report', function() {
        browser.driver.executeScript(function(value, index) {
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

          var dataObj;
          slickObject.grid.getData().getItems().forEach(function(dataItem, dataIndex) {
            if (dataItem[1] === value && dataIndex === index + 1) {
              dataObj = dataItem;
            }
          });

          return dataObj;
        }, value, index).then(function(value) {
          if (value !== undefined) {
            if (value.hasChildren === false || value.hasChildren === undefined) {
              expect(false).customError('"' + value[1] + '" grouping did not display in "Weights" report; ' + 'Found: ' + groupingNames[index]);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if the "' + groupings.length + '" groupings are present in the report', function() {
      if (groupings.length !== groupingNames.length) {
        expect(false).customError('"' + groupings.length + '" groupings did not display in the report; ' + 'Found: ' + groupingNames.length);
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if the "Groupings" and "Port. Ending Market values" are set as expected', function() {
      browser.driver.executeScript(function() {
        var elements = [];
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

        for (var i = 1; i < slickObject.grid.getDataLength(); i++) {
          elements.push(slickObject.grid.getDataItem(i));
        }

        return elements;
      }).then(function(values) {
        values.forEach(function(col, index) {
          if (col.haschildren === false && col[1] !== groupings[index] && col[2] !== marketValues[index]) {
            expect(false).customError('"' + col[1] + '" grouping did not contain "Port. Ending Market' + ' value" as "' + marketValues[index] + '"; Found: ' + col[2]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
