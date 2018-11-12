'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: scn-perf-attr-effects', function() {

  describe('Test Step ID: 479662', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3-FIPERF_ADDTL_ATTRIB_EFFTS"', function() {
      PA3MainPage.switchToDocument('pa3-fiperf-addtl-attrib-effts');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'CLIENT:/PA3/FIXED_INCOME/FI_PRICE_EFFECT_PORT.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'MFI:MLB0A0');
  });

  describe('Test Step ID: 479675', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    var arrEle = ['Price Effect', 'Spread Effect ( Local )'];
    arrEle.forEach(function(element) {
      it('Expand "Fixed Income Performance Attribution|With Currency" under "FactSet" from Available section,' + 'select "' + element + '" and perform "Right" click', function() {
        // Getting the xpath of the Available section
        var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
        group.expand();

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
              subGroup.expand();
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                    subGroup1.expand();
                    subGroup1.isExpanded().then(function(expanded) {
                      if (expanded) {
                        subGroup1.getItemByText(element).then(function(item) {
                          item.select();
                          item.isSelected().then(function(selected) {
                            if (selected) {
                              ThiefHelpers.getTransferBoxReference().transferToTarget();
                            } else {
                              expect(false).customError('"' + element + '"is not selected');
                              CommonFunctions.takeScreenShot();
                            }
                          });
                        });
                      } else {
                        expect(false).customError('"With Currency"is not expanded');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  });
                } else {
                  expect(false).customError('"Fixed Income Performance Attribution"is not expanded');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"FactSet"is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var selectedSectionItems = [];
    it('Verifying if "Price Effect" and "Spread Effect ( Local )" are added to selected section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        // Check if element is added from 'Selected' list
        noOfElements.forEach(function(listItem) {
          selectedSectionItems.push(listItem.text);
        });
        arrEle.forEach(function(element) {
          if (selectedSectionItems.indexOf(element) === -1) {
            expect(false).customError('"' + element + '"is not found in the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var listItemsOfYieldGroup = [];
    it('Should expand "Yields" under "FactSet>Fixed Income Performance Attribution" from Available section and Store list items', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Yields').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Yields"is not expanded');
                      CommonFunctions.takeScreenShot();
                    } else {
                      subGroup1.getChildrenText().then(function(noOfElements) {
                        noOfElements.forEach(function(listItem) {
                          listItemsOfYieldGroup.push(listItem.text);
                        });
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Fixed Income Performance Attribution"is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet"is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSelectedElements = ['Beginning Shift Point Yield', 'Ending Shift Point Yield', 'Shift Point Yield Change', 'Partial Duration Yield Change', 'Port. Beginning Twist Yield', 'Bench. Beginning Twist Yield', 'Port. Ending Twist Yield', 'Bench. Ending Twist Yield', 'Port. DMT Yield Change', 'Bench. DMT Yield Change'];
    var flag = 0;
    arrSelectedElements.forEach(function(element) {
      it('Verifying "' + element + '" is present in "Available" section', function() {
        if (listItemsOfYieldGroup.indexOf(element) === -1) {
          flag = flag + 1;
          expect(false).customError('"' + element + '" is not present in Available section');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 479677', function() {

    it('Verifying the view is "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' + 'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Getting the xpath of the Selected section
    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

    // Not performing select action on last element due to last element is already selected
    var arrEle = ['Security Name', 'Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Price Effect'];
    arrEle.forEach(function(element) {
      it('Should hold Control key and click on every element to select from Selected section', function() {
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

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = ['3.09', '-1.76', '0.19', '0.78', '-0.37', '-1.02', '-1.39', '-1.02', '-1.65'];
    var flag = 0;
    var arrCols = ['Shift Effect ( Local )', 'Twist Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )', 'Total Effect ( Local )', 'Total Currency Effect', 'Total Effect', 'Price Effect', 'Spread Effect ( Local )'];
    arrCols.forEach(function(column, index) {
      it('Verify that "Total" value for "' + column + '" column is "' + arrValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Attribution', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(val) {
            if (val !== arrValues[index]) {
              flag = flag + 1;
              expect(false).customError('"Total" value for "' + column + '" column is not matched ' + 'with"' + arrValues[index] + '", Found: ' + val);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
