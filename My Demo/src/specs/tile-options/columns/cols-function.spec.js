'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-function', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var selectItemInSelectedSection = function(itemName, parentElement) {
    it('Should select "' + itemName + '" in the selected section', function() {
      if (parentElement !== undefined) {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText(parentElement);

        // Verifying if "group" is expanding
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText(itemName).then(function(element) {

              element.select();
            });
          } else {
            expect(false).customError('"' + parentElement + '" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      } else {
        ThiefHelpers.getVirtualListBoxItem(xpathOfSelectedSection, itemName).then(function(item) {
          item.select();

          item.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + itemName + '" is not selected in the selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      }
    });
  };

  var createSectionAndVerifyIfExpanded = function(sectionName) {

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathOfSelectedSectionFolderIcon).press().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Add Section" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Add Section').then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Type "' + sectionName + '" into the "Section Name" field', function() {
      // Remove the existing text
      ThiefHelpers.getTextBoxClassReference('Section Name', TileOptionsColumns.xpathOfCreateSectionTextBox).setText(sectionName);

      // Verifying that "Section" is typed into the "Section Name" field
      ThiefHelpers.getTextBoxClassReference('Section Name', TileOptionsColumns.xpathOfCreateSectionTextBox).getText().then(function(name) {
        if (name !== sectionName) {
          expect(false).customError('Entered name is not valid. Expected: "' + sectionName + '", Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Ok button of create section dialog', function() {
      ThiefHelpers.getDialogButton('Create Section', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "' + sectionName + '" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText(sectionName);

      // Verifying if "Section" is expanded
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"' + sectionName + '" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 698004', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Columns;cols-function"', function() {
      PA3MainPage.switchToDocument('cols-function');
    });

    it('Verifying that "Weights" report is blank', function() {
      expect(PA3MainPage.isReportCalculated('Weights', true)).toBeFalsy();
    });

  });

  describe('Test Step ID: 698021', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    selectItemInSelectedSection('Bench. Ending Weight');

    it('Should drag "Bench. Ending Weight" from available section and drop it in "Selected" container', function() {
      var source = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Bench. Ending Weight')));
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Port. Ending Weight')));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    it('Click on "-" button next to Section1', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section1');
      group.collapse();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          expect(false).customError('"Section1 is not collapsed."');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    selectItemInSelectedSection('Bench. Ending Price');

    it('Should drag "Bench. Ending Price" from available section and drop it under "Section1" in "Selected" container', function() {
      var source = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Bench. Ending Price')));
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Section1')));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    var arrOfColumns = ['Port. Ending Weight', 'Bench. Ending Weight', 'Bench. Ending Price'];

    it('Verifying that expected columns are displayed under "Section1" in "Selected" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section1');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrOfColumns[i]) {
            expect(false).customError('Expected: "' + arrOfColumns[i] + '" but Found: "' + childArr[i].text + '".');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 811334', function() {

    it('Verifying if "Section1" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section1');
      group.expand();

      // Verifying if "Section1" is expanded
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Section1" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    selectItemInSelectedSection('Bench. Ending Price', 'Section1');

    createSectionAndVerifyIfExpanded('Section2');

    it('Verifying if "Bench. Ending Price" column is displayed under "Section2" in "Selected" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section2');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        if (childArr.length === 1) {
          if (childArr[0].text !== 'Bench. Ending Price') {
            expect(false).customError('"Bench. Ending Price" is not displayed under "Section2" of "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('More then one or less then one columns are not displayed under "Section2" of "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 698022', function() {

    it('Verifying if "Section2" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section2');

      // Verifying if "Section2" is expanded
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Section2" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Prices" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Prices').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (!expanded) {
                expect(false).customError('"Prices" is not expanded');
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

    it('Should select "Ending Price" from "FactSet > Prices" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price', 'Prices').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "Ending Price" from available section and drop it in under "Bench. Ending Price"', function() {
      var referenceOfSource = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price', 'Prices');
      var referenceOfTarget = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Bench. Ending Price')));

      browser.actions().mouseMove(referenceOfSource).mouseDown().mouseMove(referenceOfTarget).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('Click on "-" button next to "Section2"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section2');
      group.collapse();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          expect(false).customError('"Section2 is not collapsed."');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Ending Price ( Local )" from "FactSet > Prices" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price ( Local )', 'Prices').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "Ending Price ( Local )" from available section and drop it under "Section2" in "Selected" container', function() {
      var referenceOfSource = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price ( Local )', 'Prices');
      var referenceOfTarget = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Section2')));

      browser.actions().mouseMove(referenceOfSource).mouseDown().mouseMove(referenceOfTarget).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    var arrOfColumns = ['Bench. Ending Price', 'Ending Price', 'Ending Price ( Local )'];

    it('Verifying that expected columns are displayed under under "Section2" in "Selected" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section2');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrOfColumns[i]) {
            expect(false).customError('Expected: "' + arrOfColumns[i] + '" but Found: "' + childArr[i].text + '".');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 698023', function() {

    it('Should select "Ticker" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker');
      item.select();

      // Verifying if "Ticker" is selected in the selected section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Ticker" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    createSectionAndVerifyIfExpanded('Section3');

    it('Should select "Ending Price" from "FactSet > Prices" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price', 'Prices').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "Ending Price" from available section and drop it in "Section3" section', function() {
      var referenceOfSource = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Ending Price', 'Prices');
      var referenceOfTarget = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Section3')));

      browser.actions().mouseMove(referenceOfSource).mouseDown().mouseMove(referenceOfTarget).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('Verifying if "Section3" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section3');

      // Verifying if "Section" is expanded
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Section3" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ending Price" is displayed under "Section3" of "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section3');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        if (childArr.length === 1) {
          if (childArr[0].text !== 'Ending Price') {
            expect(false).customError('"Ending Price" is not displayed under "Section3" of "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('More then one or less then one column are not displayed under "Section3" of "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 698025', function() {

    var beforeDoubleClick;

    it('Storing the total number of columns under "Selected" section before double click', function() {
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        beforeDoubleClick = count;
      });
    });

    it('Double click on "Portfolio" in Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Portfolio').then(function(subGroup) {
            subGroup.select();
            subGroup.doubleClick();
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that columns are not added under "Selected" section after double clicking on "Portfolio"', function() {
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        if (count !== beforeDoubleClick) {
          expect(false).customError('Columns are added after double click on "Portfolio"');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 698028', function() {

    it('Should double click on "Position Data" under "FactSet > Portfolio"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Portfolio').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Position Data').then(function(subGroupItem) {
                  subGroupItem.select();
                  subGroupItem.doubleClick();
                });
              } else {
                expect(false).customError('"Portfolio" is not expanded');
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

    var arrOfItemsInSection3 = [];
    it('Verifying that expected columns are displayed under Section3', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Section3');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== 'Ending Price') {
            arrOfItemsInSection3.push(childArr[i].text);
          }
        }
      });
    });

    it('Verify that columns displayed under Section3 and Position data are same', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getGroupByText('Portfolio').then(function(subGroup) {
        subGroup.getGroupByText('Position Data').then(function(subGroupItem) {
          subGroupItem.expand();
          var children = subGroupItem.getChildrenText();
          children.then(function(childArr) {
            for (var i = 0; i < childArr.length; i++) {
              if (childArr[i].text !== arrOfItemsInSection3[i]) {
                expect(false).customError('Expected: "' + childArr[i] + '" but Found: "' + arrOfItemsInSection3[i] + '"');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 698168', function() {

    it('Should expand "FactSet > Portfolio > OMS" and select "End.Leavs"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Portfolio').then(function(subGroup) {

            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('OMS').then(function(subGroupItam) {
                  subGroupItam.expand();

                });
              } else {
                expect(false).customError('"Portfolio" is not expanded');
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

    it('Should select "End. Leaves" from "FactSet > Portfolio > OMS" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End. Leaves', 'OMS').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "End. Leaves" from available section and drop it in "Selected" container', function() {
      var source = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End. Leaves', 'OMS');
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Section1')));

      ThiefHelpers.dragDrop(source, target, 'before');
    });

    it('Should select "End. Executed Trades" from "FactSet > Portfolio > OMS" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End. Executed Trades', 'OMS').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "End. Executed Trades" from available section and drop it in "Selected" container', function() {
      var source = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End. Executed Trades', 'OMS');
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Port. Ending Weight')));

      ThiefHelpers.dragDrop(source, target, 'before');
    });

    it('Should select "End.. Number. of Trades" from "FactSet > Portfolio > OMS" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End.. Number. of Trades', 'OMS').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "End.. Number. of Trades" from available section and drop it in "Selected" container', function() {
      var source = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'End.. Number. of Trades', 'OMS');
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Section2')));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    var arrOfColumns = ['Ticker', 'Security Name', 'End. Leaves', 'Section1', 'End. Executed Trades', 'Port. Ending Weight', 'Bench. Ending Weight', 'End.. Number. of Trades',
      'Section2', 'Bench. Ending Price', 'Ending Price', 'Ending Price ( Local )', 'Section3', 'Ending Price', 'Port. Ending Quantity Held', 'Port. Ending Market Value ( Local )',
      'Port. Ending Market Value', 'Port. Ending Clean Market Value ( Local )', 'Port. Ending Clean Market Value', 'Port. Ending Weight',];

    it('Verifying the selected list column order', function() {
      element.all(by.xpath(TileOptionsColumns.xpathOfAllItemsInSelectedSection)).then(function(eles) {
        var arr = [];
        eles.forEach(function(ele) {
          ele.getText().then(function(val) {
            arr.push(val);
          });
        });

        return arr;
      }).then(function(arr) {
        Utilities.arrayCompare(arrOfColumns, arr);
      });
    });

  });

  describe('Test Step ID: 698178', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Performance', true, 'isSelected');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Performance', 'Options');

    it('Verifying if view changed to "Tile Options - Performance" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Performance').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Performance" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on clear all button in selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Values are not displayed under selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection);
      var children = group.getChildrenText();
      children.then(function(childArr) {
        if (childArr.length > 0) {
          expect(false).customError('Values are displayed under selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Factset > Benchmark > Position Data" and double click on "Bench. Ending Weight"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Benchmark').then(function(subGroup) {
            subGroup.expand();

            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Position Data').then(function(subGroupItam) {
                  subGroupItam.expand();

                  subGroupItam.getItemByText('Bench. Ending Weight').then(function(element) {

                    // Select "Bench. Ending Weight" from "Position Data"
                    element.select();

                    // Verifying if "Bench. Ending Weight" is selected
                    element.isSelected().then(function(selected) {
                      if (!selected) {
                        expect(false).customError('"Bench. Ending Weight" is not selected');
                        CommonFunctions.takeScreenShot();
                      }
                    });

                    // Double click on "Bench. Ending Weight"
                    element.doubleClick();
                  });

                });
              } else {
                expect(false).customError('"Portfolio" is not expanded');
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

    it('Click on "-" button next to Benchmark', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Benchmark').then(function(subGroup) {
            subGroup.collapse();

            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                expect(false).customError('"Benchmark" is not collapsed.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });

    });

    it('Expand "Portfolio" under FacSet', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Portfolio').then(function(subGroup) {
            subGroup.expand();

            subGroup.isExpanded().then(function(expanded) {
              if (!expanded) {
                expect(false).customError('"Portfolio" is not expanded.');
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

    it('Should select "Position Data" from "FactSet > Portfolio" of Available section', function() {
      TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Position Data', 'Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should drag "Position Data" from available section and drop it in "Selected" container', function() {
      var referenceOfSource = TileOptionsColumns.getItemFromAvailableOrSelectedSection('Available', 'Position Data', 'Portfolio');
      var referenceOfTarget = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Bench. Ending Weight')));

      browser.actions().mouseMove(referenceOfSource).mouseDown().mouseMove(referenceOfTarget).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    var arrOfSelectedSectionItems = [];
    it('Verifying that Values are not displayed under selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection);
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; i++) {
          if (childArr[i].text !== 'Bench. Ending Weight') {
            arrOfSelectedSectionItems.push(childArr[i].text);
          }

        }
      });
    });

    it('Expand "Portfolio" under FacSet', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getGroupByText('Portfolio').then(function(subGroup) {
        subGroup.getGroupByText('Position Data').then(function(subGroupItam) {
          subGroupItam.expand();
          var children = subGroupItam.getChildrenText();
          children.then(function(childArr) {
            for (var i = 0; i < childArr.length; i++) {
              if (childArr[i].text !== arrOfSelectedSectionItems[i]) {
                expect(false).customError('Expected: "' + childArr[i] + '" but Found: "' + arrOfSelectedSectionItems[i] + '"');
                CommonFunctions.takeScreenShot();
              }
            }
          });

        });
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Performance');

  });

});
