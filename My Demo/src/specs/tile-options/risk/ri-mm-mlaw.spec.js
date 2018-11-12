'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-mm-mlaw', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 673264', function() {

    it('Should open PA3 Application with "Client:/pa3/risk/Standalone_Risk_Group_Level"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mm-mlaw-test-case');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('MM_MLAW');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Exposure Report', undefined, 'isSelected');

    it('Verifying if "Exposure Report" report is displayed with 2 tiles', function() {
      var allTiles = PA3MainPage.getAllTilesFromReport();
      allTiles.count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('"Exposure Report" report is not displayed with 2 tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "MM_MLAW" and "NO MM_MLAW" are loaded in "Exposure Report" report', function() {
      PA3MainPage.getMatrixTile(1, 1).getText().then(function(val) {
        if (val !== 'MM_MLAW') {
          expect(false).customError('"MM_MLAW" and "NO MM_MLAW" are not loaded in a "Exposure Report" report');
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getMatrixTile(2, 1).getText().then(function(val) {
        if (val !== 'No MM_MLAW') {
          expect(false).customError('"MM_MLAW" and "NO MM_MLAW" are not loaded in a "Exposure Report" report');
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/RISK/MM_MLAW_TEST.ACTM', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'SB:CLIENT:/PA3/RISK/MM_MLAW_TEST.ACTM', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

  });

  describe('Test Step ID: 673272', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('MM_MLAW', 'Columns');

    it('Should select "Portfolio Predicted Beta" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Portfolio Predicted Beta').select();

      // Verify if 'Port. MPT Value at Risk (Two Tailed)' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Portfolio Predicted Beta').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Portfolio Predicted Beta" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and is set with "Multi-Manager Risk"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('Multi-Manager Risk', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Correlated Specific Risk" drop down is set to "Enabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Enabled', 'Correlated Specific Risk');
    });
  });

  describe('Test Step ID: 673276', function() {

    it('Should select "% Value at Risk - #VD #VT Day, #VC%" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Value at Risk - #VD #VT Day, #VC%').select();

      // Verify if '% Value at Risk - #VD #VT Day, #VC%' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Value at Risk - #VD #VT Day, #VC%').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"% Value at Risk - #VD #VT Day, #VC%" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi-Lot Actual Weights" check box is checked by default in "Risk" section', function() {
      // Verifying if check box is checked off
      ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').isChecked().then(function(flag) {
            if (!flag) {
              expect(false).customError('"Multi-Lot Actual Weights" check box is not checked off');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Multi-Lot Actual Weights" checkbox is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and verify it is set to "Multi-Manager Risk"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('Multi-Manager Risk', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" drop down is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Correlated Specific Risk" drop down is set to "Enabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Enabled', 'Correlated Specific Risk');
    });

    it('Verifying if "Calendars Days" is set to drop down', function() {
      // verifying if 'Calendar Days' is set to days drop down
      ThiefHelpers.verifySelectedDropDownText('Calendar Days', undefined, TileOptionsColumns.xpathTradingDaysDropdown);
    });

    it('Verifying if "VaR Confidence Interval (%)" text box is set to "95.0000" by default', function() {
      // Verifying that "VaR Confidence Interval (%)" is set to "95.0000"
      ThiefHelpers.getTextBoxClassReference('VaR Confidence').getText().then(function(text) {
        if (text !== '95.0000') {
          expect(false).customError('"VaR Confidence Interval (%)" text box is not set to "95.0000"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "VaR Days" text box is set to "1" by default', function() {
      // Verifying that "VaR Days" is set to "1"
      ThiefHelpers.getTextBoxClassReference('VaR Days').getText().then(function(text) {
        if (text !== '1') {
          expect(false).customError('"VaR Days" text box is not set to "1"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673283', function() {

    var textboxArr = [{textbox: 'Risk Aversion', value: '0.0100'}, {textbox: 'AS/CF Ratio:', value: '1.0000'}];

    it('Should select "Implied Alpha" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Implied Alpha').select();

      // Verify if 'Implied Alpha' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Implied Alpha').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Implied Alpha" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and verify it is set to "Multi-Manager Risk"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('Multi-Manager Risk', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" drop down is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Correlated Specific Risk" drop down is set to "Enabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Enabled', 'Correlated Specific Risk');
    });

    textboxArr.forEach(function(textbox) {
      it('Verifying if "' + textbox.textbox + '" text box is set to "' + textbox.value + '" by default', function() {
        // Verifying that text box is set to the value
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathTextBoxFromRiskSection, textbox.textbox);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
          if (text !== textbox.value) {
            expect(false).customError(textbox.textbox + ' text box is not set to ' + textbox.value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 673285', function() {

    it('Should select "% Total Risk" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Total Risk').select();

      // Verify if '% Total Risk' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Total Risk').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"% Total Risk" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Relative to Benchmark" check box is unchecked by default in "Risk" section', function() {
      // Verifying if check box is unchecked
      ThiefHelpers.getCheckBoxClassReference('Relative to Benchmark').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Relative to Benchmark').isChecked().then(function(flag) {
            if (flag) {
              expect(false).customError('"Relative to Benchmark" check box is checked off');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Relative to Benchmark" checkbox is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and verify it is set to "None"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('None', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" drop down is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi-Lot Actual Weights" check box is checked by default in "Risk" section', function() {
      // Verifying if "Multi-Lot Actual Weights" check box is  checked
      ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').isChecked().then(function(flag) {
            if (!flag) {
              expect(false).customError('"Multi-Lot Actual Weights" check box is  unchecked');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Multi-Lot Actual Weights" checkbox is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Correlated Specific Risk" drop down is set to "Enabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Enabled', 'Correlated Specific Risk');
    });
  });

  describe('Test Step ID: 673290', function() {

    it('Should select "% Factor Contr. to Tot. Risk" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Factor Contr. to Tot. Risk').select();

      // Verify if '% Factor Contr. to Tot. Risk' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('% Factor Contr. to Tot. Risk').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"% Factor Contr. to Tot. Risk" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Relative to Benchmark" check box is unchecked by default in "Risk" section', function() {
      // Verifying if check box is unchecked
      ThiefHelpers.getCheckBoxClassReference('Relative to Benchmark').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Relative to Benchmark').isChecked().then(function(flag) {
            if (flag) {
              expect(false).customError('"Relative to Benchmark" check box is checked off');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and verify it is set to "None"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('None', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi-Lot Actual Weights" check box is checked by default in "Risk" section', function() {
      // Verifying if "Multi-Lot Actual Weights" check box is  checked
      ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').isChecked().then(function(flag) {
            if (!flag) {
              expect(false).customError('"Multi-Lot Actual Weights" check box is  unchecked');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Verifying if "Correlated Specific Risk" drop down is set to "Enabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Enabled', 'Correlated Specific Risk');
    });
  });

  describe('Test Step ID: 673293', function() {

    it('Should select "Barra- % Contribution- Market Timing" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Barra- % Contribution- Market Timing').select();

      // Verify if 'Barra- % Contribution- Market Timing' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Barra- % Contribution- Market Timing').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Barra- % Contribution- Market Timing" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and verify it is set to "Multi-Manager Risk"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('Multi-Manager Risk', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" drop down is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673295', function() {

    it('Should select "BarraOne- Active Risk" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('BarraOne- Active Risk').select();

      // Verify if 'BarraOne- Active Risk' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('BarraOne- Active Risk').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ticker" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Risk" is not present in "BarraOne- Active Risk" column', function() {
      TileOptionsColumns.getExpandableElement('Risk').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Risk" accordion is present in "BarraOne- Active Risk" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673296', function() {

    var excludeColNames = ['Port Wgt from Risk Engine', 'Bench Wgt from Risk Engine', 'Active Wgt from' +
    ' Risk Engine', 'BarraOne- Active Risk',];
    var GEQTile1Arr = [];
    var GEQTile2Arr = [];
    var USEQTile1Arr = [];
    var USEQTile2Arr = [];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('MM_MLAW');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('No MM_MLAW');

    var multiHeader = ['', 'Risk Indices', 'Industries', 'Countries', 'Market'];
    multiHeader.forEach(function(value) {

      it('Pushing "GEQ" row values of "MM_MLAW" report excluding ' + excludeColNames + ' columns for future verification', function() {
        SlickGridFunctions.getRowIndex('MM_MLAW', 'GEQ', '', undefined).then(function(rowIndex) {
          PA3MainPage.getColumnNumberRangeForMultiHeader('MM_MLAW', value).then(function(range) {
            range.forEach(function(ele) {
              SlickGridFunctions.getColumnNames('MM_MLAW').then(function(arr) {
                if (ele !== 0) {
                  if (excludeColNames.indexOf(arr[ele]) === -1) {
                    browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, ele).then(function(val) {
                      val.getText().then(function(cellValue) {
                        GEQTile1Arr.push(cellValue);
                      });
                    });
                  }
                }
              });
            });
          });
        });
      });

      it('Pushing "GEQ" row values of "No MM_MLAW" report excluding ' + excludeColNames + ' columns for future verification', function() {
        SlickGridFunctions.getRowIndex('No MM_MLAW', 'GEQ', '', undefined).then(function(rowIndex) {
          PA3MainPage.getColumnNumberRangeForMultiHeader('No MM_MLAW', value).then(function(range) {
            range.forEach(function(ele) {
              SlickGridFunctions.getColumnNames('No MM_MLAW').then(function(arr) {
                if (ele !== 0) {
                  if (excludeColNames.indexOf(arr[ele]) === -1) {
                    browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
                      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, ele).then(function(val) {
                      val.getText().then(function(cellValue) {
                        GEQTile2Arr.push(cellValue);
                      });
                    });
                  }
                }
              });
            });
          });
        });
      });

      it('Pushing "US_EQ" row values of "MM_MLAW" report excluding ' + excludeColNames + ' columns for future verification', function() {
        SlickGridFunctions.getRowIndex('MM_MLAW', 'US_EQ', '', undefined).then(function(rowIndex) {
          PA3MainPage.getColumnNumberRangeForMultiHeader('MM_MLAW', value).then(function(range) {
            range.forEach(function(ele) {
              SlickGridFunctions.getColumnNames('MM_MLAW').then(function(arr) {
                if (ele !== 0) {
                  if (excludeColNames.indexOf(arr[ele]) === -1) {
                    browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, ele).then(function(val) {
                      val.getText().then(function(cellValue) {
                        USEQTile1Arr.push(cellValue);
                      });
                    });
                  }
                }
              });
            });
          });
        });
      });

      it('Pushing "US_EQ" row values of "No MM_MLAW" report excluding ' + excludeColNames + ' columns for future verification', function() {
        SlickGridFunctions.getRowIndex('No MM_MLAW', 'US_EQ', '', undefined).then(function(rowIndex) {
          PA3MainPage.getColumnNumberRangeForMultiHeader('No MM_MLAW', value).then(function(range) {
            range.forEach(function(ele) {
              SlickGridFunctions.getColumnNames('No MM_MLAW').then(function(arr) {
                if (ele !== 0) {
                  if (excludeColNames.indexOf(arr[ele]) === -1) {
                    browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
                      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, ele).then(function(val) {
                      val.getText().then(function(cellValue) {
                        USEQTile2Arr.push(cellValue);
                      });
                    });
                  }
                }
              });
            });
          });
        });
      });
    });

    it('Verifying if "GEQ" row is displaying different values in "MM_MLAW" report and "No MM_MLAW" report excluding ' + excludeColNames + ' columns', function() {
      var flag = false;
      for (var i = 0; i < GEQTile1Arr.length; i++) {
        if (GEQTile2Arr[i] === GEQTile1Arr[i]) {
          flag = true;
        }
      }

      if (flag) {
        expect(false).customError('"GEQ" row is displaying similar values in "MM_MLAW" report and "No MM_MLAW" report excluding ' + excludeColNames + ' columns');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "US_EQ" row is displaying different values in "MM_MLAW" report and "No MM_MLAW" report excluding ' + excludeColNames + ' columns', function() {
      var flag = false;
      for (var i = 0; i < USEQTile1Arr.length; i++) {
        if (USEQTile2Arr[i] === USEQTile1Arr[i]) {
          flag = true;
        }
      }

      if (flag) {
        expect(false).customError('"US_EQ" row is displaying similar values in "MM_MLAW" report and "No MM_MLAW" report excluding ' + excludeColNames + ' columns');
        CommonFunctions.takeScreenShot();
      }
    });

  });
});
