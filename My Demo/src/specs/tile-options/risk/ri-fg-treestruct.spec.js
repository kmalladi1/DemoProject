'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-treestruct', function() {

  var factorsArrayItem = ['US Growth', 'US Size', 'US Non-linear Size', 'US Dividend Yield', 'US Book-to-Price', 'US Earnings Yield', 'US Beta', 'US Non-linear Beta', 'US Residual Volatility',
    'US Momentum', 'US Leverage', 'US Liquidity',];
  var factorsArrayItem2 = ['US Size', 'US Non-linear Size', 'US Dividend Yield', 'US Book-to-Price', 'US Earnings Yield', 'US Beta', 'US Non-linear Beta', 'US Residual Volatility',
    'US Momentum', 'US Leverage', 'US Liquidity', 'US Country',];
  var factorsArray = ['US Growth', 'US Size', 'US Non-linear Size', 'US Dividend Yield', 'US Book-to-Price', 'US Earnings Yield', 'US Beta', 'US Non-linear Beta', 'US Residual Volatility',
    'US Momentum', 'US Leverage', 'US Liquidity', 'Industries', 'Market', 'Total',];

  var factorArrayGroup = ['Industries', 'Market',];

  describe('Test Step ID: 704207', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/risk/Factor_Grouping_Broken_Format', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('factor-grouping-broken-format');
    });

    var arrReportName = ['Standalone and Factor Group', 'Standalone and Nested H/L',];

    arrReportName.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

  });

  describe('Test Step ID: 704208', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Standalone and Factor Group', 'Security Name');

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client: Unevenly_Layered_FG" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Client: Unevenly_Layered_FG', 'Factor Grouping');

      // verifying if 'Client: Unevenly_Layered_FG' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('Client: Unevenly_Layered_FG', 'Factor Grouping');
    });

    factorsArrayItem.forEach(function(factors) {
      it('Verifying if "Standalone Factors" "' + factors + '" is persent in the given order', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getItemByText(factors).getText().then(function() {
        }, function() {
          expect(false).customError(factors + ' factor is not available in the "Visible Factor" section');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    factorArrayGroup.forEach(function(factorGroup) {
      it('Verifying if "' + factorGroup + '" group factor is displayed and is in collapsed state', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factorGroup).getText().then(function(item) {
          if (item === factorGroup) {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factorGroup).isExpanded().then(function(status) {
              if (status) {
                expect(false).customError(factorGroup + 'groupings factor is expanded in "Visible" factors section');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            expect(false).customError(factorGroup + 'factor is not displayed under "Visible" groupings factor');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 704210', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    var arrReportName = ['Standalone and Factor Group', 'Standalone and Nested H/L',];

    arrReportName.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    it('Verifying if factors are displayed in given order and "Total" is displayed as last row', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Standalone and Factor Group', '', '').then(function(rowNames) {
        Utilities.arrayCompare(factorsArray, rowNames);
      });
    });

    factorArrayGroup.forEach(function(groupName) {
      it('Verifying if "' + groupName + '" group is in collapsed state', function() {
        PA3MainPage.isTreeExpanded('Standalone and Factor Group', groupName, 'slick-viewport slick-viewport-top slick-viewport-left').then(function() {
        }, function(collapsed) {
          if (collapsed) {
            expect(false).customError(groupName + 'group is expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 704209', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Standalone and Nested H/L', 'Security Name');

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Client: Unaligned_Top_HL_Nested" if it is not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).getSelectedText().then(function(text) {
        if (text !== 'Client: Unaligned_Top_HL_Nested') {
          ThiefHelpers.selectOptionFromDropDown('Client: Unaligned_Top_HL_Nested', 'Factor Grouping');
        }
      });
    });

    factorsArrayItem2.forEach(function(factors) {
      it('Verifying if "Standalone Factors" "' + factors + '" is displayed in the given order', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getItemByText(factors).getText().then(function() {
        }, function() {
          expect(false).customError(factors + ' factor is not available in the "Visible Factor" section');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if "Industries" group factor is displayed and is in collapsed state', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Industries').getText().then(function(item) {
        if (item === 'Industries') {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Industries').isExpanded().then(function(status) {
            if (status) {
              expect(false).customError('"Industries" groupings factor is expanded in "Visible" factors section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Industries" factor is not displayed under "Visible" groupings factor');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 704211', function() {
    var arrNames = [];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Scrolling the element to the top', function() {
      SlickGridFunctions.scrollRowToTop('Standalone and Factor Group', factorsArray.length - 1);
    });

    it('Scroll elements to the To the top', function() {
      SlickGridFunctions.scrollRowToTop('Standalone and Factor Group', 0);
    });

    var arrReportName = ['Standalone and Factor Group', 'Standalone and Nested H/L',];

    arrReportName.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    it('Collecting the column values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Standalone and Nested H/L', '', '').then(function(rowNames) {
        arrNames = rowNames;
      });
    });

    // Known Issue: US-Growth will not be displayed in report http://is.factset.com/rpd/summary.aspx?messageid=29486898
    it('Comparing if factor are displayed in the given order', function() {
      for (var i = 0; i < factorsArrayItem2.length; i++) {
        if (factorsArrayItem2[i] !== arrNames[i]) {
          expect(false).customError(factorsArrayItem2[i] + 'factor is not displayed in the given order or it is not present.');
        }
      }
    });

    it('Verifying that "Industries" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Standalone and Nested H/L', 'Industries', 'slick-pane slick-pane-top slick-pane-left');
    });

    var arrGroup = ['3 Highest', '3 Lowest', 'Other'];
    arrGroup.forEach(function(groupName) {
      it('Verifying if "' + groupName + '" group if in collapsed state', function() {
        PA3MainPage.isTreeExpanded('Standalone and Nested H/L', groupName, 'slick-viewport slick-viewport-top slick-viewport-left').then(function() {
        }, function(collapsed) {
          if (collapsed) {
            expect(false).customError(groupName + 'group is expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Total" is displayed as last row', function() {
      var last = arrNames.length;
      if (arrNames[last - 1] !== 'Total') {
        expect(false).customError();
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
