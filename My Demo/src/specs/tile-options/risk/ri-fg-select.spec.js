'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-select', function() {

  // Variables
  var wrenchItems = ['Add', 'Duplicate'];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 555424', function() {

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

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (!option) {
          expect(false).customError('"Calculation Error" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click();
    });

    it('Verifying if "Calculation Error" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'MSCI_EM:AC_WORLD_FREE', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'FTAWI:ALL_WORLD_INDEX', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if Exposures report is blank', function() {
      PA3MainPage.isReportCalculated('Exposures').then(function(found) {
        if (found) {
          expect(false).customError('"Weights" report is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

  });

  describe('Test Step ID: 555425', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Exposures', 'Risk Models', 'Risk');

    it('Should expand "APT" from the Available container and click "APT Asia Pacific Local (USD)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('APT');
      group.expand();

      // Verifying if "APT" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('APT Asia Pacific Local (USD)').then(function(element) {
            element.select();

            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"APT Asia Pacific Local (USD)" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"APT" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "APT Asia Pacific Local (USD)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT Asia Pacific Local (USD)') === -1) {
          expect(false).customError('"APT Asia Pacific Local (USD)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555426', function() {

    it('Should click "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying "Select an option" drop down appears
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (!open) {
          expect(false).customError('"Factor Grouping" drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the drop down items', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(refs) {
        refs.forEach(function(element) {
          if ((element.indexOf('None') === -1) && (element.indexOf('Personal') === -1) && (element.indexOf('Client') === -1)) {
            expect(false).customError('Drop down contains element other than None, Personal: Groupings, Client: Groupings');
            CommonFunctions.takeScreenshot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 555427', function() {

    it('Should select "None" from the drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('None', 'Factor Grouping');

      // verifying if 'None' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('None', 'Factor Grouping');
    });

    var takeScreenshot = 0;
    it('Verifying if checkboxes displayed under Preview are "Factor#1 - Factor#51"', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(childElementsArr) {
        if (childElementsArr.length !== 51) {
          expect(false).customError('Preview section not displayed with 51 factors, Expected: 51, Found: ' + childElementsArr.length);
          CommonFunctions.takeScreenShot();
        }else {
          childElementsArr.forEach(function(object, index) {
            if (object.text !== ('Factor #' + (index + 1))) {
              expect(false).customError('"Factor #' + (index + 1) + '" is not displayed in the Preview list');
              takeScreenshot = 1;
            }
          });
        }
      });

      if (takeScreenshot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 555428', function() {

    it('Should click "Remove ( X )" icon in the Selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskRiskModels.xpathClearAllIcon).press().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "APT Asia Pacific Local (USD)" is removed from Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT Asia Pacific Local (USD)') !== -1) {
          expect(false).customError('"APT Asia Pacific Local (USD)" is not removed from selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Axioma" from the Available container and click "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();

      // Verifying if "Axioma" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            group.getItemByText('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1').then(function(element) {
              element.select();

              element.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is not selected');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Axioma" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        }

      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1') === -1) {
          expect(false).customError('"Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555429', function() {

    var optionsArr = [];

    it('Should select "FactSet: Standard" from the drop down and verify', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Standard', 'Factor Grouping');

      // verifying if 'FactSet: Standard' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Factor Grouping');
    });

    var arrGroups = ['Style', 'Market', 'Local', 'Industry', 'Country', 'Currency'];
    var raiseError = 0;

    it('Verifying the Factor groups in the Visible Factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(checkBoxes) {
        console.log(checkBoxes);
        if (checkBoxes.length !== arrGroups.length) {
          expect(false).customError('Factor groups length is not as expected in the Visible Factors');
          CommonFunctions.takeScreenShot();
        } else {
          checkBoxes.forEach(function(checkBox, index) {
            if (checkBox.text !== arrGroups[index]) {
              raiseError = 1;
            }
          });
        }
      }).then(function() {
        if (raiseError === 1) {
          expect(false).customError('Factor groups in the Visible Factors section is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Factor Groupings Wrench"', function() {
      TileOptionsRiskRiskModels.getWrenchActions()._openMenu().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching wrench menu options', function() {
      ThiefHelpers.getMenuClassReference()._menu.all(by.css('tf-menu-item')).then(function(eleRef) {
        eleRef.forEach(function(Ref, index) {
          Ref.getText().then(function(menuOption) {
            optionsArr.push(menuOption);
          });
        });
      });
    });

    wrenchItems.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed in wrench menu', function() {
        if (optionsArr.indexOf(option) === -1) {
          expect(false).customError('"' + option + '" is not displayed in "Wrench" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555434', function() {

    it('Should expand "Market" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').expand();

      // Verifying if Market group is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').isExpanded().then(function(isExpanded) {
        if (!isExpanded) {
          expect(false).customError('"Market" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should collapse "Market" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').collapse();

      // Verifying if Market group is collapsed
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').isExpanded().then(function(isExpanded) {
        if (isExpanded) {
          expect(false).customError('"Market" group is not collapsed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Market" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').expand();

      // Verifying if Market group is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').isExpanded().then(function(isExpanded) {
        if (!isExpanded) {
          expect(false).customError('"Market" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Asian Market" is present in the "Market" group', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Market').getChildrenText().then(function(val) {
        console.log(val);
        if (val[0].text !== 'Asian Market') {
          expect(false).customError('"Asian Market" is not displayed in the group');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 555430', function() {
    var optionsArr = [];

    it('Should select "FactSet: Style Breakout" from the "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Style Breakout', 'Factor Grouping');

      // verifying if 'FactSet: Style Breakout' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('FactSet: Style Breakout', 'Factor Grouping');
    });

    var arrGroups = ['Exchange Rate Sensitivity', 'Growth', 'Leverage', 'Liquidity', 'Medium-Term Momentum',
      'Short-Term Momentum', 'Size', 'Value', 'Volatility', 'Market', 'Local', 'Industry', 'Country', 'Currency',];
    var raiseError = 0;

    it('Verifying the Factor groups in the Visible Factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(object) {
        if (object.length !== arrGroups.length) {
          expect(false).customError('Factor groups length is not as expected in the Visible Factors');
          CommonFunctions.takeScreenShot();
        } else {
          object.forEach(function(checkBox, index) {
            if (checkBox.text !== arrGroups[index]) {
              raiseError = 1;
            }
          });
        }
      }).then(function() {
        if (raiseError === 1) {
          expect(false).customError('Factor groups in the Visible Factors section is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Factor Groupings Wrench"', function() {
      TileOptionsRiskRiskModels.getWrenchActions()._openMenu().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching wrench menu options', function() {
      ThiefHelpers.getMenuClassReference()._menu.all(by.css('tf-menu-item')).then(function(eleRef) {
        eleRef.forEach(function(Ref, index) {
          Ref.getText().then(function(menuOption) {
            optionsArr.push(menuOption);
          });
        });
      });
    });

    wrenchItems.forEach(function(element) {
      it('Verifying if "' + element + '" is present in the Wrench menu list', function() {
        ThiefHelpers.getOptionFromDropdown(element).isDisplayed().then(function(isFound) {
          if (!isFound) {
            expect(false).customError('"' + element + '" is not displayed in the drop down');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 555433', function() {

    it('Should expand "Growth" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').expand();

      // Verifying if Growth group is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').isExpanded().then(function(isExpanded) {
        if (!isExpanded) {
          expect(false).customError('"Growth" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should collapse "Growth" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').collapse();

      // Verifying if Growth group is collapsed
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').isExpanded().then(function(isExpanded) {
        if (isExpanded) {
          expect(false).customError('"Growth" group is not collapsed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Growth" group from the "Visible Factors" list', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').expand();

      // Verifying if Market group is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').isExpanded().then(function(isExpanded) {
        if (!isExpanded) {
          expect(false).customError('"Growth" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Factor Growth" is present in the "Growth" group', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('Growth').getChildrenText().then(function(val) {
        console.log(val);
        if (val[0].text !== 'Growth') {
          expect(false).customError('"Growth" is not displayed in the group');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 555431', function() {

    it('Should select "None" from the drop down and verify', function() {
      ThiefHelpers.selectOptionFromDropDown('None', 'Factor Grouping');

      // verifying if 'None' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('None', 'Factor Grouping');
    });

    it('Verifying if "Factors" are displayed but not the Factor Groups in the Visible Factors', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(checkBoxes) {
        console.log(checkBoxes);
        checkBoxes.forEach(function(checkBox, index) {
          if (checkBox.group === true) {
            expect(false).customError('Visible Factors section is displayed with a group, Group Found: ' + checkBox);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 555432', function() {

    var optionsArr = [];

    it('Should select "Client: New Grouping 1" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Client: New Grouping 1', 'Factor Grouping');
    });

    it('Verifying "Client: New Grouping 1" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Client: New Grouping 1', 'Factor Grouping');
    });

    it('Verifying if "Factors" are displayed but not the Factor Groups in the Visible Factors', function() {
      TileOptionsRiskRiskModels.getWrenchActions()._openMenu().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching wrench menu options', function() {
      ThiefHelpers.getMenuClassReference()._menu.all(by.css('tf-menu-item')).then(function(eleRef) {
        eleRef.forEach(function(Ref, index) {
          Ref.getText().then(function(menuOption) {
            optionsArr.push(menuOption);
          });
        });
      });
    });

    wrenchItems.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed in wrench menu', function() {
        if (optionsArr.indexOf(option) === -1) {
          expect(false).customError('"' + option + '" is not displayed in "Wrench" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555435', function() {

    it('Should click "Wrench" and select "Duplicate" form the drop down', function() {
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          ThiefHelpers.getActionsClassReference(TileOptionsRiskRiskModels.getFactorGroupingWrenchIcon())._openMenu().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });

      ThiefHelpers.getMenuClassReference().selectItemByText('Duplicate').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Duplicate" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Factor Grouping" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

  });

  describe('Test Step ID: 555436', function() {

    it('Should select "High/Low (No Column Selected)" from the Edit Groupings', function() {
      CreateNewFactorGrouping.getElementFromEditGrouping(false, 'High/Low (No Column Selected)', true).click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "High/Low (No Column Selected)" is selected
      CreateNewFactorGrouping.getElementFromEditGrouping(false, 'High/Low (No Column Selected)', true).getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('selected') === -1) {
          expect(false).customError('"High/Low (No Column Selected)" from the Edit Groupings is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
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
          expect(false).customError('"History Limit" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should expand "Factor Impact" from the drop down', function() {
      CreateNewFactorGrouping.expandElementTreeInDropDown('FactSet|Factor Impact', 'FactSet');

      // Verifying if "Factor|Factor Impact" is expanded
      CreateNewFactorGrouping.checkIfExpandedDDElement('FactSet|Factor Impact');
    });

    it('Should click "Factor Impact > Average Portfolio Exposure" from the dropdown', function() {
      CreateNewFactorGrouping.getElementFromDropDown('FactSet|Factor Impact', 'Average Portfolio Exposure').click();
    });

    it('Verifying if "Average Portfolio Exposure" is selected from the drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.getComboTextBox('Column')).getText().then(function(val) {
        if (val !== 'Average Portfolio Exposure') {
          expect(false).customError('"Average Portfolio Exposure" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Hi/Low Grouping1" in the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Hi/Low Grouping1');

      // Verifying if Hi/Low Grouping1 is entered in the Name input
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(val) {
        if (val !== 'Hi/Low Grouping1') {
          expect(false).customError('"Hi/Low Grouping1" is not entered in the Name input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Save" button from the "Create New Factor Grouping" dialog', function() {
      browser.ignoreSynchronization = true;
      ThiefHelpers.getDialogButton('Create New Factor Grouping', 'Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Saving factor Grouping.. appears', function() {
      Utilities.waitUntilElementAppears(CreateNewFactorGrouping.getSpinner(), 30000);

      CreateNewFactorGrouping.getSpinner().getText().then(function(val) {
        if (val !== 'Saving factor grouping...') {
          expect(false).customError('Spinner with "Saving factor grouping..." not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for Create New Factor Grouping dialog to disappear', function() {
      browser.ignoreSynchronization = false;
      Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 30000);
    });

    it('Verifying if "Create New Factor Grouping" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Factor Grouping" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555437', function() {

    it('Should wait until Visible Factors displays', function() {
      Utilities.waitUntilElementDisappears(TileOptionsRiskRiskModels.getSpinner(), 30000);
    });

    it('Should select "Personal: Hi/Low Grouping1" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal: Hi/Low Grouping1', 'Factor Grouping');
    });

    it('Verifying "Personal: Hi/Low Grouping1" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal: Hi/Low Grouping1', 'Factor Grouping');
    });

    it('Should click "Wrench" and select "Edit" form the drop down', function() {
      TileOptionsRiskRiskModels.getWrenchActions().triggerAction('edit').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Edit Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Edit Factor Grouping" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "High/Low (No Column Selected)" is present at bottom of the list', function() {
      CreateNewFactorGrouping.getAllElementsFromEditGrouping().then(function(elements) {
        elements[elements.length - 1].getText().then(function(val) {
          if (val !== 'High/Low (Average Portfolio Exposure)') {
            expect(false).customError('High/Low (Average Portfolio Exposure) is not present at the bottom of the list');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 555438', function() {

    it('Should click "Cancel" button from the "Edit Factor Grouping" dialog', function() {
      ThiefHelpers.getDialogButton('Edit Factor Grouping', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal: Hi/Low Grouping1" from the drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal: Hi/Low Grouping1', 'Factor Grouping');

      // verifying if 'Personal: Hi/Low Grouping1' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('Personal: Hi/Low Grouping1', 'Factor Grouping');
    });

    it('Should click "Wrench" and select "Remove" form the drop down', function() {
      TileOptionsRiskRiskModels.getWrenchActions().triggerAction('remove').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "Delete" in the Delete Factor Grouping dialog', function() {
      ThiefHelpers.getDialogButton('Delete Factor Grouping', 'Delete').click();
    });

    it('Verifying if "Delete Factor Grouping" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Delete Factor Grouping').then(function(option) {
        if (option) {
          expect(false).customError('"Delete Factor Grouping" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until Visible Factors refreshes', function() {
      // Waiting for spinner disappears
      Utilities.waitUntilElementDisappears(TileOptionsRiskRiskModels.getSpinner(), 30000);
    });

    it('Should click "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying "Select an option" drop down appears
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (!open) {
          expect(false).customError('"Factor Grouping" drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal: Hi/Low Grouping1" is not present in the drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Personal: Hi/Low Grouping1').isDisplayed().then(function(isFound) {
        if (isFound) {
          expect(false).customError('"Personal: Hi/Low Grouping1" is present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
