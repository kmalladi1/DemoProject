'use strict';

// Requiring PA3 page object files

require(__dirname + '/../../../index.js');

describe('Test Case: st-option-save', function() {

  describe('Test Step ID: 746587', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    // Verifying if "Exposures Overview" report opens
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Exposures', undefined, 'isSelected');

    // Click on reports wrench icon and select options from drop down
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Stress Tests" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Stress Tests', 'Risk').select();

      // Verifying if "Stress Tests" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Stress Tests', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Stress Tests" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over on  "S&P 500 30% Decline" in the "Available section" under "FactSet|Factor Stress Tests|Market" and click on duplicate icon', function() {
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
                      subGroup1.getItemByText('S&P 500 30% Decline').then(function(item) {

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

    it('Should enter "Testing of S&P 500 30% Decline" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('Testing of S&P 500 30% Decline');
    });

    it('Verifying if the "Name" textbox is set to "Testing of S&P 500 30% Decline"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'Testing of S&P 500 30% Decline') {
          expect(false).customError('The "Name" textbox is not set to "Testing of S&P 500 30% Decline"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 746590', function() {

    it('Should expand "Client" tree from "Available" section and select "Testing of S&P 500 30% Decline", click edit icon from menu', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Testing of S&P 500 30% Decline').then(function(item) {
            item.select();

            item.getActions().then(function(val) {
              return val.triggerAction('edit');
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

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Protractor.keys.BACK_SPACE is not working
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

    it('Should enter "SP50" in the "Factor" text field', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('SP50').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Factor" input is having "SP50"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(
        function(val) {
          if (val !== 'SP50') {
            expect(false).customError('"SP50" ' +
              'is not entered in "Factor" input and Found: ' + val);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Cancel" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Testing of S&P 500 30% Decline" from "Client"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Testing of S&P 500 30% Decline').then(function(item) {
            item.select();
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the info icon next to the "Testing of S&P 500 30% Decline"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskStressTests.xpathOfInfoIconInAvailableSection, 'Testing of S&P 500 30% Decline');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Info" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if "Factor" is listed with "SP50.R"', function() {
      TileOptionsRiskStressTests.VerifyIfExpectedValuesIsPresentUnderGivenCategory('factor', 'SP50.R', true).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Factor" is not listed with "SP50.R"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 746591', function() {

    it('Should select "Testing of S&P 500 30% Decline" under "Client" from available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Testing of S&P 500 30% Decline').then(function(item) {
            item.select();

            // Check if item is selected
            item.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Testing of S&P 500 30% Decline" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
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

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Testing of S&P 500 30% Decline" is present in the selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Testing of S&P 500 30% Decline') === -1) {
          expect(false).customError('"Testing of S&P 500 30% Decline" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 750736', function() {

    it('Should select "Testing of S&P 500 30% Decline" is selected if it is not selected', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Testing of S&P 500 30% Decline').select();

      // Verify if 'Custom_Stress_Test' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Testing of S&P 500 30% Decline').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Testing of S&P 500 30% Decline" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Factor" is listed with "SP50.R"', function() {
      TileOptionsRiskStressTests.VerifyIfExpectedValuesIsPresentUnderGivenCategory('factor', 'SP50.R', false).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Factor" is not listed with "SP50.R"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 751617', function() {

    it('Should select "Testing of S&P 500 30% Decline" under "Client" from available section and click on remove icon from menu', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Testing of S&P 500 30% Decline').then(function(item) {
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

    it('Verifying if "Delete Stress Test" appeared', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Delete Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Delete" in the Delete Stress Test dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test', 'Delete').click();
    });

    it('Verifying if "Delete Stress Test" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Delete Stress Test" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(2000);
    });

    it('Verifying if "Personal > SPAR-Series-Test1" is removed from Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(listItem) {
              if (listItem.text === 'Testing of S&P 500 30% Decline') {
                expect(false).customError('"Testing of S&P 500 30% Decline" is not deleted from "Client" directory');
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
  });
});
