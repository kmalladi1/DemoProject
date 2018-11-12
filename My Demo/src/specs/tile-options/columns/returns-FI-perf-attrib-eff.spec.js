'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: returns-FI-perf-attrib-eff', function() {

  describe('Test Step ID: 673459', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3-FI_RETURNS_PERF_ADDTL_ATTRIB_EFFTS"', function() {
      PA3MainPage.switchToDocument('pa3-fi-returns-perf-addtl-attrib-effts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/FIXED_INCOME/FI_PRICE_EFFECT_PORT.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'MFI:MLB0A0', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 673460', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should click on "Fixed Income Performance Attribution|Portfolio" to expand from "Available" container', function() {
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

    var portfolioElements = ['Port. Spread Return ( Local )', 'Port. Contribution to Residual Return ( Local )'];

    portfolioElements.forEach(function(element) {

      it('Should click on "' + element + '" from the "Fixed Income Performance Attribution > Portfolio" ' + 'group in Available section', function() {
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

      it('Should click on right arrow button ', function() {
        ThiefHelpers.sendElementToSelectedSection();
      });

      it('Verifying that "' + element + '" is added to selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(element).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + element + '" did not add to selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Fixed Income Performance Attribution|With Currency" to expand from "Available" container', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
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

    it('Should click on " Spread Effect ( Local ) " from the "Fixed Income Performance Attribution > With Currency" ' + 'group in Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(elements) {
                        elements.forEach(function(columnObject, index) {
                          if (columnObject.text === 'Spread Effect ( Local )') {
                            subGroup1.getItemByIndex(index).then(function(item) {
                              item.select();

                              // Check if 'Spread Effect ( Local )' is selected
                              item.isSelected().then(function(selected) {
                                if (!selected) {
                                  expect(false).customError('"Spread Effect ( Local )" did not selected from "Available" section');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
                            });
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

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Spread Effect ( Local )" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Spread Effect ( Local )').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Spread Effect ( Local )" did not add to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Fixed Income Performance Attribution|Benchmark" to expand from "Available" container', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.expand();
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

    var elements = ['Bench. Spread Return ( Local )', 'Bench. Contribution to Residual Return ( Local )'];

    elements.forEach(function(element) {

      it('Should click on "' + element + '" from the "Fixed Income Performance Attribution > Benchmark" ' + 'group in Available section', function() {
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getGroupByText('Benchmark').then(function(subGroup1) {
                    subGroup1.isExpanded().then(function(expanded) {
                      if (expanded) {
                        subGroup1.getChildrenText().then(function(elements) {
                          elements.forEach(function(columnObject, index) {
                            if (columnObject.text === element) {
                              subGroup1.getItemByIndex(index).then(function(item) {
                                item.select();

                                // Check if 'element' is selected
                                item.isSelected().then(function(selected) {
                                  if (!selected) {
                                    expect(false).customError('"' + element + '" did not selected from "Available" section');
                                    CommonFunctions.takeScreenShot();
                                  }
                                });
                              });
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

      it('Should click on right arrow button ', function() {
        ThiefHelpers.sendElementToSelectedSection();
      });

      it('Verifying that "' + element + '" is added to selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(element).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + element + '" did not add to selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 673461', function() {

    // Getting the xpath of the Selected section
    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
    var arrOptions = [];

    it('Should copying all elements from Selected section', function() {
      var arrChildren = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      arrChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length - 1; ++i) {
          arrOptions.push(childArr[i].text);
        }
      });
    });

    it('Should hold Control key and click on every element to select from Selected section', function() {
      arrOptions.forEach(function(value) {
        // Not performing select action on last element due to last element is already selected
        if (value !== arrOptions[arrOptions.length]) {
          var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(value);
          item.select(true);
        }
      });
    });

    it('Should check if "every elements" are selected in Selected section', function() {
      arrOptions.forEach(function(listItem) {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(listItem);
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"' + listItem + '" did not highlight in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should enter "2" in the "Decimal" search box', function() {
      ThiefHelpers.getTextBoxClassReference('Decimal').setText('2');

      // Verifying that "2" is typed into the Decimal box
      ThiefHelpers.getTextBoxClassReference('Decimal').getText().then(function(text) {
        if (text !== '2') {
          expect(false).customError('"2" did not type into the "Decimal" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var columnNames = ['Port. Shift Return ( Local )', 'Port. Twist Return ( Local )', 'Port. Residual Return ( Local )', 'Port. Total Return ( Local )', 'Bench. Shift Return ( Local )', 'Bench. Twist Return ( Local )', 'Bench. Residual Return ( Local )', 'Bench. Total Return ( Local )', 'Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Port. Spread Return ( Local )', 'Port. Contribution to Residual Return ( Local )', 'Spread Effect ( Local )', 'Bench. Spread Return ( Local )', 'Bench. Contribution to Residual Return ( Local )'];
    var values = ['2.22', '-1.62', '40.73', '-1.14', '-0.78', '-0.03', '0.61', '-0.77', '2.95', '-1.58', '40.29', '-0.12', '-0.37', '-1.02', '-1.39', '-42.46', '-1.73', '-41.92', '-0.56', '0.05'];

    columnNames.forEach(function(column, index) {

      it('Verifying if "' + column + '" values is "' + values[index] + '" for "Total" row', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', column).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values[index]) {
              expect(false).customError('"' + column + '" values did not "' + values[index] + '" for "Total" row;' + ' Found :' + text);
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 673464', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    // Getting the xpath of the Available section
    var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
    var group;
    it('Should click on "Fixed Income Performance Attribution|Portfolio" to expand from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(elements) {
                        elements.forEach(function(columnObject, index) {
                          if (columnObject.text === element) {
                            subGroup1.getItemByIndex(index).then(function(item) {
                              item.select();

                              // Check if element is selected
                              item.isSelected().then(function(selected) {
                                if (!selected) {
                                  expect(false).customError('"' + element + '" did not selected from "Available" section');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
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

    it('Should click on "Port. Contribution to Spread Return ( Local )" from the "Fixed Income Performance Attribution > Portfolio" ' + 'group in Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(elements) {
                        elements.forEach(function(columnObject, index) {
                          if (columnObject.text === 'Port. Contribution to Spread Return ( Local )') {
                            subGroup1.getItemByIndex(index).then(function(item) {
                              item.select();

                              // Check if 'Port. Contribution to Spread Return ( Local )' is selected
                              item.isSelected().then(function(selected) {
                                if (!selected) {
                                  expect(false).customError('"Port. Contribution to Spread Return ( Local )" did not ' + 'selected from "Available" section');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
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

    it('Verifying that "Port. Contribution to Spread Return ( Local )" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. Contribution to Spread Return ( Local )').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Port. Contribution to Spread Return ( Local )" did not add to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Fixed Income Performance Attribution|Benchmark" to expand from "Available" container', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.expand();
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

    it('Should click on "Bench. Contribution to Spread Return ( Local )" from the "Fixed Income Performance ' + 'Attribution > Benchmark" group in Available section', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Benchmark').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(elements) {
                        elements.forEach(function(columnObject, index) {
                          if (columnObject.text === 'Bench. Contribution to Spread Return ( Local )') {
                            subGroup1.getItemByIndex(index).then(function(item) {
                              item.select();

                              // Check if 'element' is selected
                              item.isSelected().then(function(selected) {
                                if (!selected) {
                                  expect(false).customError('"Bench. Contribution to Spread Return ( Local )" did not ' + 'selected from "Available" section');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
                            });
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

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Bench. Contribution to Spread Return ( Local )" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Bench. Contribution to Spread Return ( Local )').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Bench. Contribution to Spread Return ( Local )" did not add to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var columnNames = ['Port. Shift Return ( Local )', 'Port. Twist Return ( Local )', 'Port. Residual Return ( Local )', 'Port. Total Return ( Local )', 'Bench. Shift Return ( Local )', 'Bench. Twist Return ( Local )', 'Bench. Residual Return ( Local )', 'Bench. Total Return ( Local )', 'Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Port. Spread Return ( Local )', 'Port. Contribution to Residual Return ( Local )', 'Spread Effect ( Local )', 'Bench. Spread Return ( Local )', 'Bench. Contribution to Residual Return ( Local )', 'Port. Contribution to Spread Return ( Local )', 'Bench. Contribution to Spread Return ( Local )'];
    var values = ['2.22', '-1.62', '40.73', '-1.14', '-0.78', '-0.03', '0.61', '-0.77', '2.95', '-1.58', '40.29', '-0.12', '-0.37', '-1.02', '-1.39', '-42.46', '40.73', '-41.92', '-0.56', '0.61', '-42.46', '-0.56'];

    columnNames.forEach(function(column, index) {

      it('Verifying if "' + column + '" values is "' + values[index] + '" for "Total" row', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', column).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values[index]) {
              expect(false).customError('"' + column + '" values did not "' + values[index] + '" for "Total" row;' + ' Found :' + text);
            }
          });
        });
      });
    });
  });
});
