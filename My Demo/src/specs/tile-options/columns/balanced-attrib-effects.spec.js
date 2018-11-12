'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: balanced-attrib-effects', function() {

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 673386', function() {

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3-FI_BALANCED_ATTRIB_EFFTS"', function() {
      PA3MainPage.switchToDocument('pa3-fi-balanced-attrib-effts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/FIXED_INCOME/BALANCED_ATTRIB_PORT_WITH_PRICE.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CLIENT:/PA3/FIXED_INCOME/BNCED_ATTRIB_PORT_WITH_PRCE_BENCH.ACCT', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 673387', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should expand "Balanced Attribution > With Currency" under "FactSet" from Available section', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      // Expand "Factset" frm "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Balanced Attribution').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"With Currency" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Balanced Attribution" is not expanded');
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

    var arrEle = ['Carry Effect (Local)', 'Paydown Effect (Local)'];
    arrEle.forEach(function(element) {
      it('Should select "' + element + '" from available section', function() {
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Balanced Attribution').then(function(subGroup) {
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                    subGroup1.isExpanded().then(function(expanded) {
                      if (expanded) {
                        subGroup1.getItemByText(element).then(function(item) {
                          item.select();

                          // Check if element is selected
                          item.isSelected().then(function(selected) {
                            if (!selected) {
                              expect(false).customError('"' + element + '" did not selected from "Available" section');
                              CommonFunctions.takeScreenShot();
                            }
                          });
                        });
                      } else {
                        expect(false).customError('"With Currency" is not expanded');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  });
                } else {
                  expect(false).customError('"Balanced Attribution" is not expanded');
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

      it('Should click on right arrow button', function() {
        ThiefHelpers.sendElementToSelectedSection();
      });

      it('Verifying that "' + element + '" is added to selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(element).isPresent().then(function(value) {
          if (!value) {
            expect(false).customError('"' + element + '" is not added to selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 673388', function() {

    // Getting the xpath of the Selected section
    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

    // Not performing select action on last element due to last element is already selected
    var arrEle = ['Security Name', 'Asset Class Allocation Effect (Local)', 'Shift Effect (Local)', 'Twist Effect (Local)', 'Group Allocation Effect (Local)', 'Selection Effect (Local)', 'Total Effect (Local)',
      'Total Currency Effect', 'Total Effect', 'Carry Effect (Local)',];
    arrEle.forEach(function(element) {
      it('Should hold Control key and click on ' + element + ' to select from Selected section', function() {
        if (element !== arrEle[arrEle.length]) {
          var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(element);
          item.select(true);
        }
      });
    });

    it('Should change the decimal value to "2" when is selected', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').setText('2');

      //Verifying the decimal value to be "2"
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(val) {
        if (val !== '2') {
          expect(false).customError('"Decimal" value is not updated to 2');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrColumnNames = ['Asset Class Allocation Effect (Local)', 'Shift Effect (Local)', 'Twist Effect (Local)',
      'Group Allocation Effect (Local)', 'Selection Effect (Local)', 'Total Effect (Local)', 'Total Currency Effect',
      'Total Effect', 'Carry Effect (Local)', 'Paydown Effect (Local)',];

    var cellValues = ['-1.05', '0.00', '-0.00', '0.00', '1.21', '0.15', '-0.00', '0.15', '-0.00', '--',];
    var takeScreenShot = 0;
    var value;
    arrColumnNames.forEach(function(colName, index) {
      it('Verify that the Total value for "' + colName + '" column in the report displays "' + cellValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', colName, '').then(function(ref) {
          ref.getText().then(function(val) {
            if (val !== cellValues[index]) {
              expect(false).customError('Expected to have "' + cellValues[index] + '" under "' + colName + '" of ' +
                '"Total" row but found "' + val + '" ');
              takeScreenShot = 1;
            }
          });
        }).then(function() {
          if (takeScreenShot === 1 && index === arrColumnNames.length - 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

});
