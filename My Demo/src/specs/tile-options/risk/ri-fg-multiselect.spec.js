'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-multiselect', function() {

  var expandGroup = function(parentElementPath, excludeElements) {
    it('Expand "' + parentElementPath + '" from the drop down', function() {
      CreateNewFactorGrouping.expandElementTreeInDropDown(parentElementPath, excludeElements);
    });

  };

  var clickOnAddGroupAndCreateNewGroup = function(groupName) {
    it('Should click "Group" button from the "Create New Factor Grouping" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateNewFactorGrouping.xpathGroupButton).press().then(function() {
        },
        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Create Box" Drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Create Box" Drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "' + groupName + '" in the "Group Name" text box and clicking on "+Create" button', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.xpathGroupNameTextBox).setText(groupName);

      // Thief helpers will hit enter internally which hits the create button. Hence no need of clicking on the button again
    });

    it('Verifying if "' + groupName + '" grouping is displayed in "Edit Grouping" list box of "Create New Factor Grouping" dialog', function() {
      CreateNewFactorGrouping.getElementFromEditGrouping(false, groupName, true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"' + groupName + '" grouping is not displayed in "Create New Factor Grouping" dialog');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  var clickOnAddHighLow = function() {
    it('Should click "High/Low Group" button from the "Create New Factor Grouping" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateNewFactorGrouping.xpathHighLowGroup).press().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "High/Low (No Column Selected)" is added at bottom of the list', function() {
      CreateNewFactorGrouping.getAllElementsFromEditGrouping().then(function(elements) {
        elements[elements.length - 1].getText().then(function(val) {
          if (val !== 'High/Low (No Column Selected)') {
            expect(false).customError('High/Low (No Column Selected) is not added at the bottom of the list');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Select from the "High/Low (No Column Selected)" Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (No Column Selected)').select();
    });

    it('Should click "Column" drop down from the "Create New Factor Grouping" dialog', function() {
      CreateNewFactorGrouping.getComboBoxDropDown('Column').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Column" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  };

  var clickOnAddHighLowAndSelectOptionFromColumnDropdown = function(clickOnHighLow, parentElementPath, excludeElements, optionName) {

    if (clickOnHighLow !== undefined) {
      clickOnAddHighLow();
    }

    expandGroup(parentElementPath, excludeElements);

    if (optionName !== undefined) {
      it('Should click "' + parentElementPath + ' > ' + optionName + '" from the dropdown', function() {
        CreateNewFactorGrouping.getElementFromDropDown(parentElementPath, optionName).click();
      });

      it('Verifying if "Average Portfolio Exposure" is selected from the drop down', function() {
        ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.getComboTextBox('Column')).getText().then(function(val) {
          if (val !== optionName) {
            expect(false).customError('"' + optionName + '" is not selected from the drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    }

  };

  describe('Test Step ID: 555388', function() {
    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/PA3_factor_high_low_grouping"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-factor-high-low-grouping');
    });

    it('Verifying if "Calculation Error" dialog appeared', function() {
      browser.wait(function() {
        return ThiefHelpers.isDialogOpen('Calculation Error').then(function(visible) {
          return visible;
        });
      }, 30000).then(function() {
      }, function() {

        expect(false).customError('Waited for 30 seconds but Calculation Error Dialog not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Calculation Error');

    it('Verifying if Portfolio widget is populated with "MSCI_EM:AC_WORLD_FREE"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'MSCI_EM:AC_WORLD_FREE') {
          expect(false).customError('Portfolio widget is not populated with "MSCI_EM:AC_WORLD_FREE"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "FTAWI:ALL_WORLD_INDEX"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'FTAWI:ALL_WORLD_INDEX') {
          expect(false).customError('Benchmark widget is not populated with "FTAWI:ALL_WORLD_INDEX"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Exposures report is blank', function() {
      PA3MainPage.isReportCalculated('Exposures').then(function(found) {
        if (found) {
          expect(false).customError('"Exposures" report is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });
  });

  describe('Test Step ID: 555389', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Exposures', 'Risk Models', 'Risk');

    it('Should expand "APT" from the Available container and perform double click "APT Asia Pacific Ex-Japan Local (USD)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('APT');
      group.expand();

      // Verifying if "APT" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('APT Asia Pacific Ex-Japan Local (USD)').then(function(element) {
            element.select();

            element.doubleClick();
          });
        } else {
          expect(false).customError('"APT" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Verifying if "APT Asia Pacific Ex-Japan Local (USD)" radio button is displayed in the selected section', function() {
      ThiefHelpers.isPresent('Radio', 'APT Asia Pacific Ex-Japan Local (USD)').then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"APT Asia Pacific Ex-Japan Local (USD)" radio button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "APT Asia Pacific Ex-Japan Local (USD)" is added to selected container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT Asia Pacific Ex-Japan Local (USD)') === -1) {
          expect(false).customError('"APT Asia Pacific Ex-Japan Local (USD)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555390', function() {

    it('Should select "None" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('None', 'Factor Grouping');

      // verifying if 'None' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('None', 'Factor Grouping');
    });

    it('Click on the wrench icon next to Factor Grouping dropdown', function() {
      var ref = element(by.xpath('//tf-transferbox-options//tf-actions'));
      ThiefHelpers.getActionsClassReference(ref).triggerAction('tools').then(function() {
      }, function(err) {
      });
    });

    it('Verifying if Wrench menu list appeared after clicking on "Wrench" icon ', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" icon');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Add').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Factor Grouping" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfGroups = ['Group1', 'Group2', 'Group3'];
    arrOfGroups.forEach(function(groupName) {
      clickOnAddGroupAndCreateNewGroup(groupName);
    });

    it('Verifying that Group1, Group2 and Group3 are displayed at the end in the Edit Grouping', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < 3; i++) {
          if (childArr[childArr.length - 1 - i].text !== arrOfGroups[arrOfGroups.length - i - 1]) {
            expect(false).customError('"' + arrOfGroups[i] + '" is not displayed in the last.');
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });
  });

  describe('Test Step ID: 555394', function() {

    // Click on "Hight/Low Group" button and click on the columns dropdown and expand Risk
    clickOnAddHighLowAndSelectOptionFromColumnDropdown(true, 'FactSet|Risk', 'FactSet');

    // Expand "Standard"
    expandGroup('FactSet|Risk|Standard', 'FactSet|Risk');

    // Expand "Asset Date" and select Raw Factor Exposure
    clickOnAddHighLowAndSelectOptionFromColumnDropdown(undefined, 'FactSet|Risk|Standard|Asset Data', 'FactSet|Risk|Standard', 'Raw Factor Exposure');

    // Click on "Hight/Low Group" button and click on the columns dropdown and expand "FactSet|Factor Impact" and select Average Portfolio Exposure
    clickOnAddHighLowAndSelectOptionFromColumnDropdown(true, 'FactSet|Factor Impact', 'FactSet', 'Average Portfolio Exposure');

    it('Verifying that High/Low (Raw Factor Exposure)and High/Low (Average Portfolio Exposure) are displayed at the end in the Edit Grouping', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('High/Low (No Column Selected)') > -1 && arr.indexOf('High/Low (Raw Factor Exposure)') === -1 && arr.indexOf('High/Low (Average Portfolio Exposure)')) {
          expect(false).customError('"High/Low (No Column Selected)" is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 555396', function() {

    it('Should click "Factor #41" from "Regional" grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #41').select();
    });

    it('Should hold "Shift" key,', function() {
      browser.actions().keyDown(protractor.Key.SHIFT).perform();
    });

    it('Should click "Factor #43" from "Regional" grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #43').select();
    });

    it('Should hold "Shift" key,', function() {
      browser.actions().keyUp(protractor.Key.SHIFT).perform();
    });

    it('Should hold "Control" key,', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should click "Factor #49" from "Regional" grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #49').select();
    });

    it('Should Drag the selected factor "Factor #41" and drop them in "High/Low (Raw Factor Exposure)" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Factor #41', undefined);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'High/Low (Raw Factor Exposure)', undefined);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Should release "Control" key', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Expand "High/Low (Raw Factor Exposure)" if not already expanded to verify child elements', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (Raw Factor Exposure)');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    var arrFactors = ['Factor #41', 'Factor #42', 'Factor #43', 'Factor #49'];

    it('Verifying that Factor #41, Factor #42, Factor #43 and Factor #49 are displayed under High/Low (Raw Factor Exposure)', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (Raw Factor Exposure)');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrFactors[i]) {
            expect(false).customError('"' + arrFactors[i] + '" is not present in High/Low (Raw Factor Exposure).');
            CommonFunctions.takeScreenShot();
          }
        }

      });

    });

    it('Collapse "High/Low (Raw Factor Exposure)"', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (Raw Factor Exposure)');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.collapse();
        }
      });
    });

  });

  describe('Test Step ID: 555395', function() {

    it('Should Drag the selected grouping "High/Low (Raw Factor Exposure)" and drop them in "Group3" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'High/Low (Raw Factor Exposure)', true);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group3', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Should click "Factor #40" from Edit grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #40').select();
    });

    it('Should hold "Control" key,', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should click "Factor #46" from "Regional" grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #46').select();
    });

    it('Select from the "Group1" Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group1').select();
    });

    it('Should Drag the selected elements from Edit Grouping "Factor #40" and drop them in "Group2" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Factor #40', false);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group2', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Should release "Control" key,', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Expand "Group2" if not already expanded to verify child elements', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group2');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    var arrChildItems = ['Factor #40', 'Factor #46', 'Group1'];

    it('Verifying that Factor #40, Factor #46 and Group1 are displayed under "Group2"', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group2');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrChildItems[i]) {
            expect(false).customError('"' + arrChildItems[i] + '" is not present in Group2.');
            CommonFunctions.takeScreenShot();
          }
        }

      });

    });

  });

  describe('Test Step ID: 555392', function() {

    it('Collapse "Group2"', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group2');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.collapse();
        }
      });
    });

    it('Select "Group2" from the  Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group2').select();
    });

    it('Should hold "Control" key,', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Select "High/Low (Average Portfolio Exposure)" from the  Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (Average Portfolio Exposure)').select();
    });

    it('Should Drag the selected grouping from Edit Grouping "Group2, High/Low (Average Portfolio Exposure)" and drop them in "Group3" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group2', true);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group3', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Should release "Control" key,', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Expand "Group3" if not already expanded to verify child elements', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group3');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    var arrChildItems = ['High/Low (Raw Factor Exposure)', 'Group2', 'High/Low (Average Portfolio Exposure)'];

    it('Verifying that High/Low (Raw Factor Exposure), Group2 and High/Low (Average Portfolio Exposure) are displayed under "Gropu3"', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group3');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrChildItems[i]) {
            expect(false).customError('"' + arrChildItems[i] + '" is not present in Group2.');
            CommonFunctions.takeScreenShot();
          }
        }

      });
    });
  });

  describe('Test Step ID: 555391', function() {

    it('Should expand "High/Low (Raw Factor Exposure)" in "Edit Grouping" section select "Factor #49"', function() {
      ThiefHelpers.expandAndGetListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Factor #49', 'Group3|High/Low (Raw Factor Exposure)', 'Group3').select();
    });

    it('Should Drag the selected item "Factor #49" from Edit Grouping and drop them in "Factor #44" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping('Group3|High/Low (Raw Factor Exposure)', 'Factor #49', undefined);

      // Giving the reference of "Factor #45" as "Factor #49" has to be placed below "Factor #44" which is "Factor #45" reference
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(CreateNewFactorGrouping.xpathOfRequiredFactorFromEditGroupingContainer, 'Factor #44')));
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Verifying if "Factor #49" is displayed under "Factor #44" in the Edit Grouping container', function() {
      CreateNewFactorGrouping.getAllElementsFromEditGrouping().then(function(elements) {
        var expectedFactor = function(i) {
          return elements[i].getText().then(function(val) {
            if (val !== 'Factor #49') {
              return false;
            }else {
              return true;
            }
          });
        };

        var getFactor = function(i) {
          elements[i].getText().then(function(val) {
            if (val === 'Factor #44') {
              expectedFactor(i + 1).then(function(value) {
                if (!value) {
                  expectedFactor(i - 1).then(function(found) {
                    if (!found) {
                      expect(false).customError('"Factor #49" is not displayed above/under "Factor #44" in the Edit Grouping container.');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                }
              });
            }
          });
        };

        for (var i = 0; i < elements.length; i++) {
          getFactor(i);
        }

      });
    });

    it('Select "Group2"  from the "Group3" grouping in Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group3').getGroupByText('Group2').select();
    });

    it('Should Drag the selected grouping "Group2" from "Group3" and drop them below "Factor #48"', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping('Group3', 'Group2', undefined);
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(CreateNewFactorGrouping.xpathOfRequiredFactorFromEditGroupingContainer, 'Factor #51')));
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Verifying if "Group2" is displayed under "Factor #51" in the Edit Grouping container', function() {
      CreateNewFactorGrouping.getAllElementsFromEditGrouping().then(function(elements) {
        var expectedFactor = function(i) {
          elements[i].getText().then(function(val) {
            if (val !== 'Group2') {
              expect(false).customError('"Group2" is not displayed under "Factor #51" in the Edit Grouping container.');
              CommonFunctions.takeScreenShot();
            }
          });
        };

        var getFactor = function(i) {
          elements[i].getText().then(function(val) {
            if (val === 'Factor #51') {
              expectedFactor(i + 1);
            }
          });
        };

        for (var i = 0; i < elements.length; i++) {
          getFactor(i);
        }

      });
    });

  });

  describe('Test Step ID: 555393', function() {

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Create New Factor Grouping');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Exposures');
  });
});
