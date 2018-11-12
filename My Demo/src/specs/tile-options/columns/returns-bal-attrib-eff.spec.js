'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: returns-bal-attrib-eff', function() {

  describe('Test Step ID: 673410', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3-FI_RETURNS_BALANCED_ATTRIB_EFFTS"', function() {
      PA3MainPage.switchToDocument('pa3-fi-returns-balanced-attrib-effts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/FIXED_INCOME/BALANCED_ATTRIB_PORT_WITH_PRICE.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CLIENT:/PA3/FIXED_INCOME/BNCED_ATTRIB_PORT_WITH_PRCE_BENCH.ACCT', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

  });

  describe('Test Step ID:673411', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should click on "FactSet|Fixed Income Performance Attribution|Portfolio" to expand from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      // Expand "Factset" frm "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Portfolio" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Fixed Income Performance Attribution" is not expanded');
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

    it('Should click on "Port. Spread Return ( Local )" from the "FactSet|Fixed Income Performance Attribution > Portfolio" ' +
      'group in Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Port. Spread Return ( Local )').then(function(item) {
                        item.select();

                        // Check if element is selected
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"Port. Spread Return ( Local )" did not selected from "Available" section');
                            CommonFunctions.takeScreenShot();
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
                expect(false).customError('"Fixed Income Performance Attribution" is not expanded');
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

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Port. Spread Return ( Local )" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. Spread Return ( Local )').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Port. Spread Return ( Local )" did not add to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "FactSet|Balanced Attribution|With Currency" to expand from "Available" container', function() {
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

    it('Should click on "Spread Effect (Local)" from the "FactSet|Balanced Attribution|With Currency" ' +
      'group in Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Balanced Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Spread Effect (Local)').then(function(item) {
                        item.select();

                        // Check if element is selected
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"Spread Effect (Local)" did not selected from "Available" section');
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

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Spread Effect (Local)" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Spread Effect (Local)').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Spread Effect (Local)" did not add to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
    var arrElements = [];
    it('Collecting columns under "FactSet|Balanced Attribution|With Currency"', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Balanced Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(childArray) {
                        childArray.forEach(function(columnName) {
                          arrElements.push(columnName.text);
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

    var availableSectionItems = ['Asset Class Allocation Effect (Local)', 'Shift Effect (Local)', 'Twist Effect (Local)',
      'Group Allocation Effect (Local)', 'Selection Effect (Local)', 'Total Effect (Local)', 'Carry Effect (Local)',
      'Spread Effect (Local)', 'Income Effect (Local)', 'Paydown Effect (Local)', 'Ex-Post Inflation Effect (Local)',
      'Ex-Ante Inflation Effect (Local)', 'Price Effect (Local)', 'Total Currency Effect', 'Total Effect',];

    availableSectionItems.forEach(function(element) {

      it('Verifying if "' + element + '" is present in Available section under "FactSet|Balanced Attribution|With ' +
        'Currency"', function() {
        if (arrElements.indexOf(element) === -1) {
          expect(false).customError('"' + element + '" did not present in Available section under ' +
            '"FactSet|Balanced Attribution|With Currency"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 673412', function() {

    // Getting the xpath of the Selected section
    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

    // Not performing select action on last element due to last element is already selected
    var arrEle = ['Security Name','Port. Shift Return ( Local )','Port. Twist Return ( Local )','Port. Residual Return ( Local )','Port. Total Return ( Local )', 'Asset Class Allocation Effect (Local)', 'Shift Effect (Local)', 'Twist Effect (Local)', 'Group Allocation Effect (Local)', 'Selection Effect (Local)', 'Total Effect (Local)',
      'Total Currency Effect', 'Total Effect', 'Port. Spread Return ( Local )',];
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

    var columnNames = ['Port. Shift Return ( Local )', 'Port. Twist Return ( Local )', 'Port. Residual Return ( Local )',
      'Port. Total Return ( Local )', 'Asset Class Allocation Effect (Local)', 'Shift Effect (Local)',
      'Twist Effect (Local)', 'Group Allocation Effect (Local)', 'Selection Effect (Local)', 'Total Effect (Local)',
      'Total Currency Effect', 'Total Effect', 'Port. Spread Return ( Local )', 'Spread Effect (Local)',];
    var values = ['-0.87', '-0.22', '2.50', '2.07', '-1.05', '0.00', '-0.00', '-0.00',
      '1.21', '0.15', '-0.00', '0.15', '0.66', '0.00',];

    columnNames.forEach(function(column, index) {

      it('Verifying if "' + column + '" values is "' + values[index] + '" for "Total" row', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', column).then(function(ref) {
          ref.getText().then(function(val) {
            if (val !== values[index]) {
              expect(false).customError('"' + column + '" values did not "' + values[index] + '" for "Total" row;' +
                ' Found :' + val);
            }
          });
        });

      });
    });

  });

});
