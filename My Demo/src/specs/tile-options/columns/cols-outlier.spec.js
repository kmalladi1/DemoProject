'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-outlier', function() {

  // Variable(s)
  var arrLargeCapTotalReturnVal = [];
  var arrLargeCapTotalReturnVal2 = [];
  var arrSPTotalReturnVal = [];
  var arrSPTotalReturnVal2 = [];

  var rowRegion = ['slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-left'];

  var colRegion = ['slick-pane slick-pane-top slick-pane-right', 'slick-pane slick-pane-bottom slick-pane-right'];

  var rowNames = ['all row expect Total'];

  var multiHeader = ['Large Cap Core Test', 'S&P 500'];

  var colCount;

  describe('Test Step ID: 558409', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/COLUMNS-DIGITS"', function() {
      PA3MainPage.switchToDocument('columns-digits');
    });

    it('Verifying if "Performance" Report starts calculating', function() {
      // Verifying Weights Report is Calculating and Displays Load Icon
      expect(PA3MainPage.getReportCalculationDlg('Performance')).toBeTruthy();
    });

    it('Should wait for "Performance" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 180000);
    });

    it('Verifying that "Performance" report is calculated', function() {
      // Verifying "Performance" Report is calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Portfolio" is set to "CLIENT:/PA3/ACCOUNTS/TEST.ACCT" ', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(path) {
        if (path !== 'CLIENT:/PA3/ACCOUNTS/TEST.ACCT') {
          expect(false).customError('"Portfolio" is not set to "CLIENT:/PA3/ACCOUNTS/TEST.ACCT". ' +
            'Expected: "CLIENT:/PA3/ACCOUNTS/TEST.ACCT" but Found: "' + path + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Benchmark" is set to "SPN:SP50" ', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'SPN:SP50') {
          expect(false).customError('"Benchmark" is not set to "SPN:SP50".' +
            'Expected: "SPN:SP50" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    multiHeader.forEach(function(headerName, headerIndex) {

      rowNames.forEach(function(rowName, index) {

        it('Should note "Total Return" column cell Values of "' + headerName + '" for "' + rowName + '', function() {
          PA3MainPage.getAllElementsFromCalculatedReport('Performance', rowRegion[index]).then(function(references) {
            references.forEach(function(eleRef) {
              eleRef.getText().then(function(value) {
                if (headerIndex === 0) {
                  colCount = 1;
                } else {
                  colCount = 3;
                }

                PA3MainPage.getCellValueForMultiHeaderColumn('Performance', value, colCount,
                  rowRegion[index], colRegion[index]).then(function(val) {
                  if (headerIndex === 0) {
                    arrLargeCapTotalReturnVal.push(val);
                  } else {
                    arrSPTotalReturnVal.push(val);
                  }
                });
              });
            });
          });
        });

      });

    });

  });

  describe('Test Step ID: 558404', function() {

    it('Should click on wrench Icon from "Performance" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Performance" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Performance') {
          expect(false).customError('"Tile Options - Performance" view has not appeared. ' +
            'Expected: "Tile Options - Performance" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Total Return" from "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Total Return').select();

      // Verifying "Port. Total Return" is selected from "Selected" section of "Options" pill
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Total Return').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Total Return" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Outliers" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Outliers').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Outliers" section is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Outliers" has the following options: "MAXIMUM VALUE", "MINIMUM VALUE", "APPLY OUTLIER SETTINGS"', function() {
      // Variable(s)
      var i = 0;

      TileOptionsColumns.getOutliersSubSectionNames().each(function(element) {
        expect(element.getText()).toEqual(TileOptionsColumns.arrOutliersSubSections[i]);
        i++;
      });
    });

  });

  describe('Test Step ID: 558405', function() {

    it('Should change "Limit" drop down value from "None" to "# of Std Devs" from "Maximum value" sub-section', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "# of Std Devs" from the drop down
      TileOptionsColumns.getDropDownOption('# of Std Devs').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "# of Std Devs" is selected
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').getText().then(function(selectedValue) {
        if (selectedValue !== '# of Std Devs') {
          expect(false).customError('"# of Std Devs" is not selected. ' +
            'Expected: "# of Std Devs" but Found: "' + selectedValue + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should change "Limit" drop down value from "# of Std Devs" to "None" from "Maximum value" sub-section', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "None" from the drop down
      TileOptionsColumns.getDropDownOption('None').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "None" is selected
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').getText().then(function(selectedValue) {
        if (selectedValue !== 'None') {
          expect(false).customError('"None" is not selected. ' +
            'Expected: "None" but Found: "' + selectedValue + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Edit box" is set to "0" ', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Maximum').getAttribute('value').then(function(value) {
        if (value !== '0') {
          expect(false).customError('"Edit box" is set to "0".Expected "0" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Replace With" drop down value displays "NA" ', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Replace With').getText().then(function(displayed) {
        if (displayed !== 'NA') {
          expect(false).customError('"Replace With" drop down value is not displayed as "NA". ' +
            'Expected: "NA" but Found: "' + displayed + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558406', function() {

    it('Should click on "Limit" drop down from "MAXIMUM VALUE" and set "Value" ', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select "Value" from drop down
      TileOptionsColumns.getDropDownOption('Value').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Value" is selected
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Limit').getText().then(function(selectedValue) {
        if (selectedValue !== 'Value') {
          expect(false).customError('"Value" is not selected. ' +
            'Expected: "Value" but Found: "' + selectedValue + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "20" in edit box of "MAXIMUM" value', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Maximum', 20, true, false);

      // Verifying value "20" is set in edit box of "MAXIMUM"
      expect(TileOptionsColumns.setOrGetValueInSpinBox('Maximum').getAttribute('value')).toEqual('20');
    });

    it('Verifying "Replace with" drop down is enabled', function() {
      expect(TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Replace With')
        .getAttribute('class')).not.toContain('disabled');
    });

    it('Should click on "Replace With" drop down of "MAXIMUM" section', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Replace With').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Replace With" drop down menu appears', function() {
      TileOptionsColumns.getLimitOrReplaceDropDown('Maximum', 'Replace With', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Replace With" drop down menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Replace With" drop down has the following options "NA", "NM (not meaningful)", "Maximum" items', function() {
      // Variable(s)
      var i = 0;

      TileOptionsColumns.getAllDropDownOptions().each(function(element) {
        expect(element.getText()).toEqual(TileOptionsColumns.arrOutliersReplaceWith[i]);
        i++;
      });
    });

  });

  describe('Test Step ID: 558407', function() {

    it('Should click on "Limit" drop down and set "Value" ', function() {

      // Click on "Limit" drop down of "MINIMUM VALUE" section of "OUTLIERS"
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Limit').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Value" from drop down
      TileOptionsColumns.getDropDownOption('Value').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying "Limit" drop down is set with value "Value"
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Limit').getText().then(function(dropdown) {
        if (dropdown !== 'Value') {
          expect(false).customError('"Limit" drop down is not set with value "Value". ' +
            'Expected: "Value" but Found: "' + dropdown + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Replace with" section edit box is enables', function() {
      expect(TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Replace With')
        .getAttribute('class')).not.toContain('disabled');
    });

    it('Should enter "2" in edit box of "MINIMUM" value', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Minimum', 2, true, false);

      // Verifying if "2" is set in edit box of "MINIMUM"
      expect(TileOptionsColumns.setOrGetValueInSpinBox('Minimum').getAttribute('value')).toEqual('2');
    });

    it('Should click on "Replace With" drop down and set "NM (not meaningful)"', function() {

      // Should click on "Replace With" drop down of "MINIMUM VALUE" section of "OUTLIERS"
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Replace With').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Should select "NM (not meaningful)" from drop down
      TileOptionsColumns.getDropDownOption('NM (not meaningful)').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Replace With" drop down is set with value "NM (not meaningful)"
      TileOptionsColumns.getLimitOrReplaceDropDown('Minimum', 'Replace With').getText().then(function(dropdown) {
        if (dropdown !== 'NM (not meaningful)') {
          expect(false).customError('"Replace With" drop down is not set with value "NM (not meaningful)". ' +
            'Expected: "NM (not meaningful)" but Found: "' + dropdown + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 558408', function() {

    it('Should click on "OK" button from "Tile Options - Performance" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Performance" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Performance" view is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Performance" report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Performance')).toBeTruthy();
    });

    it('Should wait for "Performance" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 180000);
    });

    it('Verifying if "Performance" report has calculated', function() {
      // Verifying "Performance" Report is calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    multiHeader.forEach(function(headerName, headerIndex) {

      rowNames.forEach(function(rowName, index) {

        it('Should note down "Total Return" column cell Values of "' + headerName + '" for "' + rowName + '', function() {
          var eleRefs = PA3MainPage.getAllElementsFromCalculatedReport('Performance', rowRegion[index]);
          eleRefs.get(index).isPresent().then(function() {
          }, function(error) {

            if (error.name === 'StaleElementReferenceError') {
              eleRefs = PA3MainPage.getAllElementsFromCalculatedReport('Performance', rowRegion[index]);
            } else {
              expect(false).customError(error);
              CommonFunctions.takeScreenShot();
            }
          });

          eleRefs.then(function(references) {
            references.forEach(function(eleRef) {
              eleRef.getText().then(function(value) {
                if (headerIndex === 0) {
                  colCount = 1;
                } else {
                  colCount = 3;
                }

                PA3MainPage.getCellValueForMultiHeaderColumn('Performance', value, colCount,
                  rowRegion[index], colRegion[index]).then(function(val) {
                  if (headerIndex === 0) {
                    arrLargeCapTotalReturnVal2.push(val);
                  } else {
                    arrSPTotalReturnVal2.push(val);
                  }
                });
              });
            });
          });
        });
      });

    });

    it('Verifying if "Total Return" Cell Values less than 2 & greater than 20 are shown empty of "Large Cap Core Test"', function() {
      var needScreenshot = 0;
      arrLargeCapTotalReturnVal.forEach(function(val, index) {
        if (parseFloat(val) < parseFloat(2.0) || parseFloat(val) > parseFloat(20.0)) {
          if (arrLargeCapTotalReturnVal2[index] !== '--') {
            expect(false).customError('Expected : "--" but Found "' + arrLargeCapTotalReturnVal2[index] + '"');
            needScreenshot++;
            if (needScreenshot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

    it('Verifying if "Total Return" Cell Values less than 2 & greater than 20 are shown empty of "S&P 500"', function() {
      var needScreenshot = 0;
      arrSPTotalReturnVal.forEach(function(val, index) {
        if (parseFloat(val) < parseFloat(2.0) || parseFloat(val) > parseFloat(20.0)) {
          if (arrSPTotalReturnVal2[index] !== '--') {
            expect(false).customError('Expected : "--" but Found "' + arrSPTotalReturnVal2[index] + '"');
            needScreenshot++;
            if (needScreenshot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

});
