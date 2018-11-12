'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: returns-perf-volatility-effect', function() {

  describe('Test Step ID: 617201', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3-FI_RETURNS_PERF_VOL_EFFTS"', function() {
      PA3MainPage.switchToDocument('pa3-fi-returns-perf-vol-effts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/FIXED_INCOME/FI_PRICE_EFFECT_PORT.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'MFI:MLB0A0', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 617202', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should expand "Fixed Income Performance Attribution|Portfolio" under "FactSet" from Available section', function() {
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

    var arrEle = ['Port. Volatility Return (Local)', 'Port. Contribution to Residual Return ( Local )', 'Port. Contribution to Volatility Return (Local)'];

    arrEle.forEach(function(element) {
      it('Should select "' + element + '" from available section', function() {
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getGroupByText('Portfolio').then(function(subGroup1) {
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

    it('Should expand "With Currency" under "FactSet|Fixed Income Performance Attribution" from Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
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

    it('Should select "Volatility Effect (Local)" from available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Volatility Effect (Local)').then(function(item) {
                        item.select();

                        // Check if 'Volatility Effect (Local)' is selected
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"Volatility Effect (Local)" did not selected from "Available" section');
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

    it('Should click on right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Volatility Effect (Local)" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Volatility Effect (Local)').isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"Volatility Effect (Local)" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Benchmark" under "FactSet|Fixed Income Performance Attribution" from Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Benchmark').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Benchmark" is not expanded');
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

    var arrEle1 = ['Bench. Volatility Return (Local)', 'Bench. Contribution to Residual Return ( Local )', 'Bench. Contribution to Volatility Return (Local)'];

    arrEle1.forEach(function(element) {
      it('Should select "' + element + '" from available section', function() {
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getGroupByText('Benchmark').then(function(subGroup1) {
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
                        expect(false).customError('"Benchmark" is not expanded');
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

  describe('Test Step ID: 617203', function() {

    var valuesArray = ['2.22', '-1.62', '-1.73', '-1.14', '-0.78', '-0.03', '0.04', '-0.77', '2.95', '-1.58', '-1.05', '-0.69', '-0.37', '-1.02', '-1.39', '-0.00', '-1.73', '-0.00', '-0.00', '0.01', '0.04', '0.01'];

    var screenShot = 0;

    var columnsArray = ['Port. Shift Return ( Local )', 'Port. Twist Return ( Local )', 'Port. Residual Return ( Local )', 'Port. Total Return ( Local )', 'Bench. Shift Return ( Local )', 'Bench. Twist Return ( Local )', 'Bench. Residual Return ( Local )', 'Bench. Total Return ( Local )', 'Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Port. Volatility Return (Local)', 'Port. Contribution to Residual Return ( Local )', 'Port. Contribution to Volatility Return (Local)', 'Volatility Effect (Local)', 'Bench. Volatility Return (Local)', 'Bench. Contribution to Residual Return ( Local )', 'Bench. Contribution to Volatility Return (Local)'];

    it('Should select all elements from the "selected" section using control key', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var container = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection);
      var itemsArrayRef = container.getChildrenText();
      itemsArrayRef.then(function(itemArray) {
        itemArray.forEach(function(element) {
          container.getItemByText(element.text).isSelected().then(function(selected) {
            if (!selected) {
              container.getItemByText(element.text).select(true);
            }
          });

          // Check if item is selected
          container.getItemByText(element.text).isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + element.text + '" is not selected from "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should enter "2" in "FORMAT" accordion "Decimal" field', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', 2, true, false);

      // Verifying if the decimal field is set to "2"
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals').getAttribute('value').then(function(value) {
        if (value !== '2') {
          expect(false).customError('"Decimal" field is not set to "2" in "FORMAT" accordion, Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    columnsArray.forEach(function(column, index) {
      it('Verify that "Total" value for "' + column + '" column is "' + valuesArray[index] + '"', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(val) {
            if (val !== valuesArray[index]) {
              screenShot++;
              expect(false).customError('"Total" value for "' + column + '" column is not matched ' + 'with"' + valuesArray[index] + '", Found: ' + val);
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
