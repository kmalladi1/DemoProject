'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: spread-eff-carry-eff', function() {

  var arrElements;
  var arrElements1;
  var group;
  var arrColumns = ['Sector Spread Effect (Local)', 'Security Spread Effect (Local)', 'Curve Carry Effect (Local)',
    'Spread Carry Effect (Local)',];

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var verifyIfSelected = function(itemName) {
    it('Verifying if "' + itemName + '" is selected', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText(itemName).then(function(item) {
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"' + itemName + '"is not selected');
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
  };

  var selectItem = function(itemName) {
    it('Should select "' + itemName + '" from "FactSet > Fixed Income Performance Attribution > With Currency"', function() {
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('With Currency').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText(itemName).then(function(item) {
                        item.select();
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
  };

  var verifyIfGrayedout = function(elementName) {
    it('Verifying if "' + elementName + '" is grayed out', function() {

      // We are using thief helpers before using page object function to make the required element
      // into visible sate before performing actions on it
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.getGroupByText('Fixed Income Performance Attribution').then(function(subGroup) {
        subGroup.getGroupByText('With Currency').then(function(subGroup1) {
          subGroup1.getItemByText(elementName).then(function(item) {
            TileOptionsColumns.getElementFromAvailableSection('FactSet|Fixed Income Performance Attribution|' +
              'With Currency', elementName).getAttribute('class').then(function(value) {
              if (value.indexOf('disabled') === -1) {
                expect(false).customError('"' + elementName + '" is not grayed out');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  };

  describe('Test Step ID: 687072', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "CLIENT:;PA3;FIXED_INCOME;PA3_FI_SPREAD_EFF_CARRY_EFF"', function() {
      PA3MainPage.switchToDocument('pa3-fi-spread-eff-carry-eff');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/FIXED_INCOME/FI_PRICE_EFFECT_PORT.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'MFI:MLB0A0', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 687073', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    it('Expand "Fixed Income Performance Attribution|With Currency" under "FactSet"', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

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

    selectItem('Sector Spread Effect (Local)');

    arrElements = ['Sector Spread Effect (Local)', 'Security Spread Effect (Local)'];
    arrElements.forEach(function(itemName) {
      verifyIfSelected(itemName);
    });

    verifyIfGrayedout('Spread Effect ( Local )');

  });

  describe('Test Step ID: 687074', function() {

    it('Should click on right arrow button', function() {
      ThiefHelpers.getTransferBoxReference().transferToTarget();
    });

    it('Should click the up arrow till the "Sector Spread Effect (Local)" is moved to "third" position', function() {
      TileOptionsColumns.getAllElements('Selected').count().then(function(count) {
        for (var i = 1; i < count - 2; i++) {
          ThiefHelpers.getTransferBoxReference().target.up();
        }
      });
    });

    var arrElement = [];
    it('Verifying if "' + arrElements + '" are present in 3 and 4th positions in "Selected" section', function() {
      // Get number of elements in 'Selected' list
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        noOfElements.forEach(function(listItem) {
          arrElement.push(listItem.text);
        });
      }).then(function() {
        arrElements.forEach(function(element, index) {
          if (arrElement.indexOf(element) !== (index + 2)) {
            expect(false).customError('"' + element + '" is not  present in the "' + (index + 3) + '" position. Found' + arrElement);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 687076', function() {

    selectItem('Curve Carry Effect (Local)');

    arrElements1 = ['Curve Carry Effect (Local)', 'Spread Carry Effect (Local)'];
    arrElements1.forEach(function(itemName) {
      verifyIfSelected(itemName);
    });

    verifyIfGrayedout('Carry Effect ( Local )');

  });

  describe('Test Step ID: 687077', function() {

    it('Should click on right arrow button', function() {
      ThiefHelpers.getTransferBoxReference().transferToTarget();
    });

    it('Should click the up arrow till the "Sector Spread Effect (Local)" is moved to "third" position', function() {
      TileOptionsColumns.getAllElements('Selected').count().then(function(count) {
        // Count of elements will be 13
        for (var i = 1; i < count - 5; i++) {
          ThiefHelpers.getTransferBoxReference().target.up();
        }
      });
    });

    var arrElement = [];
    it('Verifying if "' + arrElements1 + '" are present in 5th and 6th positions in "Selected" section', function() {
      // Get number of elements in 'Selected' list
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        noOfElements.forEach(function(listItem) {
          arrElement.push(listItem.text);
        });
      }).then(function() {
        arrElements1.forEach(function(element, index) {
          if (arrElement.indexOf(element) !== (index + 4)) {
            expect(false).customError('"' + element + '" is not  present in the "' + (index + 5) + '" position. Found' + arrElement);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 687517', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var screenShot = 0;
    it('Verifying if "' + arrColumns + '" are present as column in the report', function() {
      SlickGridFunctions.getAllColumnFieldValue('Attribution').then(function(arrayColumns) {
        arrColumns.forEach(function(name) {
          if (arrayColumns.indexOf(name) < 0) {
            expect(false).customError('"' + name + '"  is not displayed as column; Found: ' + arrayColumns);
            screenShot = 1;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 687078', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    var arrColumnsSelected = ['Sector Spread Effect (Local)', 'Curve Carry Effect (Local)'];

    it('Should on the "X" icon next to "' + arrColumnsSelected + '" from "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      arrColumnsSelected.forEach(function(columnName) {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        item.getActions().then(function(actions) {
          actions.triggerAction('remove');
        });
      });

    });

    var arrElement = [];
    it('Verifying if "' + arrColumns + '" are deleted in "Selected" section', function() {
      // Get number of elements in 'Selected' list
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        noOfElements.forEach(function(listItem) {
          arrElement.push(listItem.text);
        });
      }).then(function() {
        arrColumns.forEach(function(element, index) {
          if (arrElement.indexOf(element) !== -1) {
            expect(false).customError('"' + element + '" is present in the Selected section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 687079', function() {

    it('Expand "Fixed Income Performance Attribution|With Currency" under "FactSet"', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
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

    selectItem('Spread Effect ( Local )');

    verifyIfSelected('Spread Effect ( Local )');

    arrElements = ['Sector Spread Effect (Local)', 'Security Spread Effect (Local)'];
    arrElements.forEach(function(itemName) {
      verifyIfGrayedout(itemName);
    });

  });

  describe('Test Step ID: 687080', function() {

    selectItem('Carry Effect ( Local )');

    arrElements1 = ['Curve Carry Effect (Local)', 'Spread Carry Effect (Local)'];
    arrElements1.forEach(function(itemName) {
      verifyIfGrayedout(itemName);
    });

  });

  describe('Test Step ID: 687081', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    var screenShot = 0;
    it('Verifying if "' + arrColumns + '" are removed as column in the report', function() {
      SlickGridFunctions.getAllColumnFieldValue('Attribution').then(function(arrayColumns) {
        arrColumns.forEach(function(name) {
          if (arrayColumns.indexOf(name) !== -1) {
            expect(false).customError('"' + name + '"  is displayed as column; Found: ' + arrayColumns);
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
