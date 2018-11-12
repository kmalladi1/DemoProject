'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-identifier', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 555906', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/IDENTIFIER_STRESS_TEST"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('identifier-stress-test');
    });

    it('Waiting for the reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if Calculation Error Dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Format Options|Theme|Carbon" option from wrench menu drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if the theme of the report is changed to "carbon"', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') < 0) {
          expect(false).customError('Report theme is not changed to "carbon"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555907', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click "+" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Create New Stress Test" dialog is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the theme all over "Create New Stress Test" dialog is set to carbon', function() {
      element(by.xpath(TileOptionsRiskStressTests.xpathCreateNewStressTestDialog)).getCssValue('background-color').then(function(color) {
        if (color !== 'rgba(16, 16, 16, 1)') {
          expect(false).customError('The theme of "Create New Stress Test" dialog is not set to carbon; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 680491', function() {
    var iconsArr = ['copy','info'];
    var virtualListItemReference;

    it('Should click on "Cancel" button in "Create New Stress Test" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should expand "FactSet > Factor Stress Tests > Market" and select "Dow Jones 30% Decline" from "Available" section', function() {
      // Getting the xpath of the Available section
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    } else {
                      subGroup1.getItemByText('Dow Jones 30% Decline').then(function(item) {
                        item.select();
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
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

    it('Verifying if the "info" & "Duplicate" icons appear on the "Dow Jones 30% Decline"', function() {
      TileOptionsRiskStressTests.getIcons('Dow Jones 30% Decline', 'Available').then(function(eleRef) {
        if (eleRef.length === iconsArr.length) {
          eleRef.forEach(function(Ref) {
            Ref.getAttribute('type').then(function(value) {
              console.log(value);
              if (iconsArr.indexOf(value) === -1) {
                expect(false).customError('The "info" & "duplicate"(copy) icon are not displayed for "Dow Jones 30% Decline"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }else {
          expect(false).customError('"Dow Jones 30% Decline" is not displayed with 2 icons, Found: ' + eleRef.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  var fieldValues = [];
  var fieldNames = ['Type', 'Factor', 'Shock Amount', 'Shock Type', 'Horizon', 'Horizon Frequency', 'Decay Rate Time', 'Decay Rate Event', 'Adjust Absolute Values'];

  describe('Test Step ID: 648045', function() {

    it('Should click on "i" icon for "Dow Jones 30% Decline"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (!expanded) {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    } else {
                      subGroup1.getItemByText('Dow Jones 30% Decline').then(function(item) {

                        item.getIcons().then(function(icons) {
                          icons.clickIcon('info');
                        });
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
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

    fieldNames.forEach(function(name, index) {

      it('Recording "' + name + '" field in an array for later verification', function() {
        TileOptionsRiskStressTests.getInfoBoxData(name, 'dialog').getText().then(function(value) {
          fieldValues[index] = value;
        });
      });

    });

    it('Verifying if "Copy of Dow Jones 30% Decline" is present in "Client" directory and delete it', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Client') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
            group.expand();

            group.isExpanded().then(function(expanded) {
              if (expanded) {
                group.getChildrenText().then(function(arrObject) {
                  arrObject.forEach(function(listItem) {
                    if (listItem.text === 'Copy of Dow Jones 30% Decline') {
                      group.getItemByText('Copy of Dow Jones 30% Decline').then(function(item) {
                        item.select();

                        item.getActions().then(function(actions) {
                          actions.triggerAction('remove');
                        });
                      });
                    }
                  });
                });
              } else {
                expect(false).customError('"Client" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    // After deleting also the stress test is not getting deleted until the application is refreshed (Workaround suggested)
    it('Refreshing the application for the delete to happen', function() {
      browser.refresh();
    });

  });

  describe('Test Step ID: 555908', function() {

    it('Should expand "FactSet > Factor Stress Tests > Market" and click on "Duplicate" icon of "Dow Jones 30% Decline" from available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Dow Jones 30% Decline').then(function(item) {
                        item.getActions().then(function(actions) {
                          actions.triggerAction('duplicate');
                        });
                      });
                    } else {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
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

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Advanced Options" section if not already expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          EditStressTest.getAccordion('Advanced Options').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if "Advanced Options" section is expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          expect(false).customError('"Advanced Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Type" drop down is set to "Identifier"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Type').getSelectedText().then(function(text) {
        if (text !== fieldValues[0]) {
          expect(false).customError('The "Type" drop down is not set to "' + fieldValues[0] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Factor" text box is set to "DJII"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== fieldValues[1]) {
          expect(false).customError('The "Factor" text box is not set to "' + fieldValues[1] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Shock" text box is set to "-30"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (parseInt(text) !== parseInt(fieldValues[2])) {
          expect(false).customError('The "Shock" text box is not set to "' + fieldValues[2] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Shock" drop down is set to "% Return"', function() {
      ThiefHelpers.verifySelectedDropDownText(fieldValues[3], undefined, EditStressTest.getDropDown('Shock'));
    });

    it('Verifying if "Horizon" text box is set as "0"', function() {
      ThiefHelpers.getTextBoxClassReference('Horizon').getText().then(function(text) {
        if (parseInt(text) !== parseInt(fieldValues[4])) {
          expect(false).customError('The "Horizon" text box is not set to "' + fieldValues[4] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Horizon" frequency drop down is set to "Monthly"', function() {
      var text1;
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Horizon')).getSelectedText().then(function(text) {
        text1 = fieldValues[5].replace('ly', 's');
        if (text1 !== text) {
          expect(false).customError('"Horizon" frequency drop down is set to "' + text1 + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Decay Rate (For Time Weighted)" text box is set to "0.9800"', function() {
      ThiefHelpers.getTextBoxClassReference('Decay Rate (For Time Weighted)').getText().then(function(text) {
        if (text !== fieldValues[6]) {
          expect(false).customError('The "Decay Rate (For Time Weighted)" text box is not set to "' + fieldValues[6] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Decay Rate (For Event Weighted)" text box is set to "0.9400"', function() {
      ThiefHelpers.getTextBoxClassReference('Decay Rate (For Event Weighted)').getText().then(function(text) {
        if (text !== fieldValues[7]) {
          expect(false).customError('The "Decay Rate (For Event Weighted)" text box is not set to "' + fieldValues[7] + '"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Adjust Absolute Values" check box is set as expected', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathCheckBoxFromAccordion, 'Adjust Absolute Values');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          if (fieldValues[8] === 'No') {
            expect(false).customError('"Adjust Absolute Values" checkbox is not set as expected');
            CommonFunctions.takeScreenShot();
          }
        } else if (!checked) {
          if (fieldValues[8] === 'Yes') {
            expect(false).customError('"Adjust Absolute Values" checkbox is not set as expected');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verifying if the "Name" textbox is set to "Copy of Dow Jones 30% Decline"', function() {
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Copy of Dow Jones 30% Decline') {
          expect(false).customError('The "Name" textbox is not set to "Copy of Dow Jones 30% Decline"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555914', function() {

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to ""; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "LHMN1570" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('LHMN1570').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "LHMN1570"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'LHMN1570') {
          expect(false).customError('The "Factor" textbox is not set to "LHMN1570"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on drop down next to "Shock Type" and selected "Level"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).open();

      // Selecting Level from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).selectItemByText('Level');
    });

    it('Verifying if "Level" is selected from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).getSelectedText().then(function(text) {
        if (text !== 'Level') {
          expect(false).customError('The "Shock type" drop down is not set to "Level"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "currency" drop down and select "British Pounds" from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.xpathCurrencyDropdown).open();

      // Verify "British Pounds" is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.xpathCurrencyDropdown).selectItemByText('British Pounds', 1);
    });

    it('Verifying if the "currency" drop down is set to "British Pounds"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.xpathCurrencyDropdown).getSelectedText().then(function(text) {
        if (text !== 'British Pounds') {
          expect(false).customError('The "currency" drop down is not set to "British Pounds"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "34" into "Shock" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Shock')).setText('34');
    });

    it('Verifying if the "Shock" text box is set to "34"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (parseInt(text) !== parseInt('34')) {
          expect(false).customError('The "Shock" text box is not set to "34"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555909', function() {

    it('Should expand "Advanced Options" section if not already expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          EditStressTest.getAccordion('Advanced Options').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if "Advanced Options" section is expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          expect(false).customError('"Advanced Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checkBoxes = ['Stressed Factor Feel Back', 'Force Return for Shocked Asset'];

    checkBoxes.forEach(function(checkbox) {

      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathCheckBoxFromAccordion, checkbox);

      it('Should check "' + checkbox + '" check box if not already checked', function() {
        ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();
          }
        });
      });

      it('Verifying if the "' + checkbox + '" checkbox is checked', function() {
        ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkbox + '" checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var decayTextBoxes = ['Decay Rate (For Time Weighted)', 'Decay Rate (For Event Weighted)'];
    var values = ['0.6800', '0.91'];

    decayTextBoxes.forEach(function(textbox, index) {

      it('Should type "' + values[index] + '" value in the "' + textbox + '" text box', function() {
        ThiefHelpers.getTextBoxClassReference(textbox).setText(values[index]);
      });

      it('Verifying if the "' + textbox + '" text box is set to "' + values[index] + '"', function() {
        ThiefHelpers.getTextBoxClassReference(textbox).getText().then(function(text) {
          if (text !== values[index]) {
            expect(false).customError('The "' + textbox + '" text box is not set to "' + values[index] + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Saving Stress Test... appears', function() {
      Utilities.waitUntilElementAppears(EditStressTest.getSpinner(), 30000);

      EditStressTest.getSpinner().getAttribute('loading-message').then(function(val) {
        if (val !== 'Saving stress test...') {
          expect(false).customError('Spinner with "Saving stress test..." is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Waiting for the element to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 30000);
    });

  });

  describe('Test Step ID: 555910', function() {

    it('Should hover over "Dow Jones 30% Decline" from "FactSet > Factor Stress Tests > Market" in "Available" section and click on info icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();

            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.expand();

                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Dow Jones 30% Decline').then(function(item) {
                        item.getIcons().then(function(icons) {
                          icons.clickIcon('info');
                        });
                      });
                    } else {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Factset" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    fieldNames.forEach(function(name, index) {

      it('Verifying "' + name + '" field to equal previous values', function() {
        TileOptionsRiskStressTests.getInfoBoxData(name, 'dialog').getText().then(function(value) {
          if (value !== fieldValues[index]) {
            expect(false).customError('"' + name + '" field is not matched with previously recorded values');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 555915', function() {

    it('Should collapse "FactSet > Factor Stress Tests > Market" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.collapse();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          expect(false).customError('"FactSet" is not collapsed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Copy of Dow Jones 30% Decline" from "Client" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.getItemByText('Copy of Dow Jones 30% Decline').then(function(item) {
        item.select();
      });
    });

    it('Should click on "wrench" icon next to "Copy of Dow Jones 30% Decline"', function() {
      TileOptionsRiskStressTests.getElementActionsFromAvailable('Client', 'Copy of Dow Jones 30% Decline')._openMenu().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if wrench drop down appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var options = ['Duplicate', 'Edit', 'Remove'];

    options.forEach(function(option) {

      it('Verifying if "' + option + ' is present in the drop down"', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
          if (array.indexOf(option) < 0) {
            expect(false).customError('"' + option + '" is not present in the drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if there are only "3" options in the drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        if (array.length !== 3) {
          expect(false).customError('"3" elements are not present in the drop down; Found: ' + array.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555916', function() {

    it('Should select "Edit" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Edit').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on drop down next to "Shock Type" and selected "% Return"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).open();

      // Selecting % Return from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).selectItemByText('% Return');
    });

    it('Verifying if "% Return" is selected from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, EditStressTest.getDropDown('Shock')).getSelectedText().then(function(text) {
        if (text !== '% Return') {
          expect(false).customError('The "Shock type" drop down is not set to "% Return"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clear the text in the risk model and click on the dropdown expand the group and select option
    CreateNewStressTest.clearRiskModelTextBoxAndExpandGroupToSelectOption('Barra', 'Barra Global Long-Term Model (GEM3L)');

    it('Should wait until the grid loads', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Should expand "Advanced Options" section if not already expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          EditStressTest.getAccordion('Advanced Options').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if "Advanced Options" section is expanded', function() {
      EditStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body'))
        .isPresent().then(function(status) {
        if (!status) {
          expect(false).customError('"Advanced Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "History Limit" drop down to load after accordion is expanded', function() {
      browser.wait(function() {
        return element(by.xpath(EditStressTest.xpathHistoryLimitDrodownButton)).isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, '"History Limit" drop down is not displayed');
    });

    it('Should click on "History Limit" drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, EditStressTest.xpathHistoryLimitDrodownButton).press();
    });

    it('Should select "Five Years Ago" from Drop down" ', function() {
      EditStressTest.getOptionFromDropdown('Five Years Ago').click();
    });

    it('Verifying if "History Limit" text box is set to "Five Years Ago" ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathDatepickerTextbox, 'History Limit');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== 'Five Years Ago') {
          expect(false).customError('The "History Limit" text box is not set to "Five Years Ago"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until the grid loads', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Should click on "Report Date" drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, EditStressTest.xpathReportDateDropdownButton).press();
    });

    it('Should select "End of Last Year" from Drop down" ', function() {
      EditStressTest.getOptionFromDropdown('End of Last Year').click();
    });

    it('Verifying if "Report Date" text box is set to "End of Last Year" ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathPreviewDatepickerTextbox, 'Report Date');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== 'End of Last Year') {
          expect(false).customError('The "Report Date" text box is not set to "End of Last Year"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until the grid loads', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 20000);
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    var arrDateColumn = [];
    var datearray = [];
    var datearray2 = [];
    var year;

    it('Should read all data from "Date" Column', function() {
      EditStressTest.getColumnData('Date', 0).then(function(colData) {
        arrDateColumn = colData;
      });
    });

    it('Verifying if top most record date is "december" of "last year"', function() {
      Utilities.getCurrentDate('DDMMYYYY', '/').then(function(date) {
        datearray = date.split('/');
        datearray2 = arrDateColumn[0].split('/');
        year = parseInt(datearray[2]) - 1;
        if (datearray2[0] !== '12' || year.toString() !== datearray2[2]) {
          expect(false).customError('Top most record is not matching with expected; Expected: "12/' + year + '"; ' +
            'Found: "' + datearray2[0] + '/' + datearray2[2] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the difference between top and bottom most record is "5" years', function() {
      datearray2 = arrDateColumn[arrDateColumn.length - 1].split('/');
      var difference = parseInt(year) - parseInt(datearray2[2]);

      // The difference is 4, 5 years back from 2016 dec 31st is 2011 dec 31st, while moving towards jan 1st the year becomes 2012
      if (difference !== 4) {
        expect(false).customError('The difference between top and bottom most record is not "5" years; ' +
          'Found the difference as: ' + difference + 1);
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 555911', function() {

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 18000);

      PA3MainPage.closeQAInfoBox();
    });

    it('Automation: Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    it('Waiting for the reports to start calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg(), 600000);
    });
  });

  describe('Test Step ID: 555965', function() {

    it('Automation: Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

    // As we are refreshing the application in 648045 step report recalculates and calculation error dialog appears again
    it('Waiting for the reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000);
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if Calculation Error Dialog is closed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Should enter "Barra Global Long-Term (GEM3L)" into the search filed in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('Barra Global Long-Term (GEM3L)');

      // Verifying that "Barra Global Long-Term (GEM3L)" is typed into the search field
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== 'Barra Global Long-Term (GEM3L)') {
          expect(false).customError('"Barra Global Long-Term (GEM3L)" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Stress Tests" under "Risk" tab from LHP to select', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Stress Tests', 'Risk').select();

      //Verifying if "Stress Tests" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Stress Tests', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Stress Tests" is not selected inside "Risk" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Copy of Dow Jones 30% Decline" from "Client" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      // Verify if Equity is expanded
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Copy of Dow Jones 30% Decline').then(function(item) {
            item.select();

            item.isSelected().then(function(flag) {
              if (!flag) {
                expect(false).customError('"Copy of Dow Jones 30% Decline" not selected from "Client"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskStressTests.xpathTransferBox);
    });

    it('Verifying if "Copy of Dow Jones 30% Decline" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Copy of Dow Jones 30% Decline') === -1) {
          expect(false).customError('"Copy of Dow Jones 30% Decline" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaders = ['Barra Global Long-Term Model (GEM3L)|Copy of Dow Jones 30% Decline', 'Barra Global Long-Term Model (GEM2L)' +
    '|Copy of Dow Jones 30% Decline', 'NIS US Fundamental Model|Copy of Dow Jones 30% Decline',];
    var values = ['-100.00', '-100.00', '68.22'];
    var values1 = ['-11.55', '-9.13', '140.56'];

    multiheaders.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '|Percent Standalone Return (Time Wght)" column for "Total" row is set ' +
        'to "' + values[index] + '"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(range) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', range[0], 'slick-pane slick-pane-top slick-' +
            'pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(totalValue) {
            if (totalValue !== values[index]) {
              expect(false).customError('"' + multiheader + '|Percent Standalone Return (Time Wght)" column for ' +
                '"Total" row is set to "' + values[index] + '"; Found: ' + totalValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if the "' + multiheader + '|Percent Standalone Return (Event Wght)" column for "Total" row is set ' +
        'to "' + values1[index] + '"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(range) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', range[1], 'slick-pane slick-pane-top slick-' +
            'pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(totalValue) {
            if (totalValue !== values1[index]) {
              expect(false).customError('"' + multiheader + '|Percent Standalone Return (Event Wght)" column for ' +
                '"Total" row is set to "' + values1[index] + '"; Found: ' + totalValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 555912', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click on "X" icon of "Copy of Dow Jones 30% Decline" item in "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Copy of Dow Jones 30% Decline');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Verifying if still "Copy of Dow Jones 30% Decline" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Copy of Dow Jones 30% Decline') !== -1) {
          expect(false).customError('"Copy of Dow Jones 30% Decline" is not deleted from the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    it('Should click on remove icon from wrench menu of "Copy of Dow Jones 30% Decline" under "Client"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Copy of Dow Jones 30% Decline').then(function(item) {
            item.select();

            item.getActions().then(function(val) {
              val.triggerAction('remove');
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Delete Stress Test" is displayed', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Delete Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Delete" button from the "Delete Stress Test" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test', 'Delete').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Delete Stress Test" disappeared', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(found) {
        if (found) {
          expect(false).customError('"Delete Stress Test" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Adding wait time for the element to get deleted', function() {
      Utilities.waitUntilElementDisappears(TileOptionsRiskStressTests.getElementFromAvailableSection('Client', 'Copy of ' + 'Dow Jones 30% Decline'), 30000);
    });

    it('Wait for the application to load', function() {
      browser.wait(function() {
        return element(by.xpath(TileOptionsRiskStressTests.xpathAvailableContainer)).isDisplayed().then(function(isfound) {
          return isfound;
        }, function() {
          return false;
        });
      }, 30000).then(function() {}, function() {});
    });

    it('Verifying if "Copy of Dow Jones 30% Decline" is not present in the "Available section"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.getChildrenText().then(function(arrObject) {
        arrObject.forEach(function(listItem) {
          if (listItem.text === 'Copy of Dow Jones 30% Decline') {
            expect(false).customError('"Copy of Dow Jones 30% Decline" is not deleted from "Personal" directory');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 555913', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

  describe('Test Step ID: 680492', function() {

    it('Waiting for the reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Format Options|Theme|Quartz" option from wrench menu drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the theme of the report is changed to "Quartz"', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('Carbon') >= 0) {
          expect(false).customError('Report theme is not changed to "Quartz"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
