'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-extrm-sim', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 555944', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/EXTREME_EVE_STRESS_TEST"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('extreme-eve-stress-test');
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if the "Calculation Error" is displayed', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (!found) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Calculation Error" disappeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if "Weights" Report is blank', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (found) {
          expect(false).customError('"Weights" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

  });

  describe('Test Step ID: 555945', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    // Should click on folder icon from available section and add a category
    CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_1', 'Personal', 'Personal', TileOptionsRiskStressTests.xpathTransferBox);

    it('Should type "Iraq" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).setText('Iraq');

      // Verifying if Iraq is entered
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).getText().then(function(text) {
        if (text !== 'Iraq') {
          expect(false).customError('"Iraq" is not entered in the Search field');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for the Search to happen
      browser.sleep(3000);
    });

    it('Should select "Iraq War (3/2003) - Sim" from the search results and should click on "Duplicate" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Monte Carlo Extreme Event Simulations').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('Iraq War (3/2003) - Sim').then(function(item) {
                  item.select();

                  item.getActions().then(function(actions) {
                    actions.triggerAction('duplicate');
                  });
                });
              } else {
                expect(false).customError('"Monte Carlo Extreme Event Simulations" is not expanded');
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

    it('Verifying if the "Copy of Iraq War (3/2003) - Sim" is displayed in "Stress Test Name" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Copy of Iraq War (3/2003) - Sim') {
          expect(false).customError('"Copy of Iraq War (3/2003) - Sim" is not displayed in "Stress Test Name" text box; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555950', function() {

    it('Should click on "Start Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskStressTests.xpathDatePickerButton, 'Start Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "3/15/2004" in "Start Date" text box', function() {
      ThiefHelpers.setDateInCalendar('3/15/2004', 2);
    });

    it('Verifying if the "Start Date" text box is set to "3/15/2004"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(date) {
        if (date !== '3/15/2004') {
          expect(false).customError('"Start Date" text box is not set to "3/15/2004"; Found: ' + date);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal/Dir_1');

    it('Should click on "Save" button from the "Edit Stress Test" dialog', function() {
      ThiefHelpers.getDialogButton('Edit Stress Test', 'Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait until the saving operation is completed', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000);
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (found) {
          expect(false).customError('"Edit Stress Test" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Copy of Iraq War (3/2003) - Sim" from the "Personal" in available section and click on "info" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(childGroup) {
            childGroup.expand();
            childGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                childGroup.getItemByText('Copy of Iraq War (3/2003) - Sim').then(function(item) {
                  item.select();

                  item.getIcons().then(function(icons) {
                    icons.clickIcon('info');
                  });
                });
              } else {
                expect(false).customError('"Dir_1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var startDate;

    it('Recording "Start Date" value from the info dialog box for later verification', function() {
      TileOptionsRiskStressTests.getInfoBoxData('Start Date', 'dialog').getText().then(function(text) {
        startDate = text;
      });
    });

    it('Verifying if the date from the info box is "3/15/2004"', function() {
      if (startDate !== '3/15/2004') {
        expect(false).customError('Date from the info dialog box is not set as "3/15/2004"; Found: ' + startDate);
        CommonFunctions.takeScreenShot();
      }
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

  describe('Test Step ID: 555947', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click on "Clear All" button to clear "Selected" list', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathClearAllIcon).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Iraq War (3/2003) - Sim" from the "Personal/Dir_1" in available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(childGroup) {
            childGroup.expand();
            childGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                childGroup.getItemByText('Iraq War (3/2003) - Sim').then(function(item) {
                  item.select();

                  // Check if 'Iraq War (3/2003) - Sim' is selected
                  item.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError('"Iraq War (3/2003) - Sim" did not selected from "Available" section');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Dir_1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 555946', function() {

    var multiheaders = ['Barra Global Long-Term Model (GEM3L)|Copy of Iraq War (3/2003) - Sim', 'Barra Global Long-Term ' +
    'Model (GEM2L)|Copy of Iraq War (3/2003) - Sim', 'NIS US Fundamental Model|Copy of Iraq War (3/2003) - Sim',];
    var values = ['1.1', '1.3', '2.0'];

    multiheaders.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '|ST % Value at Risk 1 Calendar Day, 95%" column for "Total" row is set ' +
        'to "' + values[index] + '"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(range) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', range, 'slick-pane slick-pane-top slick-' +
            'pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(totalValue) {
            // Ignoring second digit
            totalValue = totalValue.slice(0, -1);
            if (totalValue !== values[index]) {
              expect(false).customError('"' + multiheader + '|ST % Value at Risk 1 Calendar Day, 95%" column for ' +
                '"Total" row is set to "' + values[index] + '"; Found: ' + totalValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 555951', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    // Should click on folder icon from available section and add a category
    CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_1', 'Personal', 'Personal', TileOptionsRiskStressTests.xpathTransferBox);

    it('Verifying that "Error" dialog opened', function() {
      ThiefHelpers.isDialogOpen('Error', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Error" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Error" dialog displays the text', function() {
      ThiefHelpers.getDialogClassReference('Error', undefined, undefined, undefined).getContent().getText().then(function(text) {
        if (text !== 'Category already exists') {
          expect(false).customError('"Error" dialog is not displayed with "Category already exists" message. Expected: "" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555952', function() {

    it('Should click on "OK" button in "Error" pop up', function() {
      ThiefHelpers.getDialogButton('Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in  Error pop up');
        CommonFunctions.takeScreenShot();
      });
    });

    // Should click on folder icon from available section and add a category
    CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_2', 'Personal', 'Personal/Dir_1', TileOptionsRiskStressTests.xpathTransferBox);
    CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_3', 'Personal', 'Personal/Dir_1/Dir_2', TileOptionsRiskStressTests.xpathTransferBox);
    CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_4', 'Personal', 'Personal/Dir_1/Dir_2/Dir_3', TileOptionsRiskStressTests.xpathTransferBox);

    it('Verifying if "Personal > Dir_1 > Dir_2 > Dir_3 > Dir_4" is displayed in the same structure', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Dir_2').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup.getGroupByText('Dir_3').then(function(subGroup2) {
                        subGroup2.expand();
                        subGroup2.isExpanded().then(function(expanded) {
                          if (expanded) {
                            subGroup2.getGroupByText('Dir_4').then(function(subGroup3) {
                            subGroup3.expand();
                            subGroup3.isExpanded().then(function(expanded) {
                              if (!expanded) {
                                expect(false).customError('"Dir_4" is not expanded');
                                CommonFunctions.takeScreenShot();
                              }
                            });
                          });
                          } else {
                            expect(false).customError('"Dir_3" is not expanded');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"Dir_2" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Dir_1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555948', function() {

    it('Should type "Iraq" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).setText('Iraq');

      // Verifying if Iraq is entered
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).getText().then(function(text) {
        if (text !== 'Iraq') {
          expect(false).customError('"Iraq" is not entered in the Search field');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for the Search to happen
      browser.sleep(3000);
    });

    it('Should select "Iraq War (3/2003)" from the search results and should click on "Duplicate" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Extreme Event Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('Iraq War (3/2003)').then(function(item) {
                  item.select();

                  item.getActions().then(function(actions) {
                    actions.triggerAction('duplicate');
                  });
                });
              } else {
                expect(false).customError('"Extreme Event Stress Tests" is not expanded');
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

    it('Verifying if the "Copy of Iraq War (3/2003)" is displayed in "Stress Test Name" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Copy of Iraq War (3/2003)') {
          expect(false).customError('"Copy of Iraq War (3/2003)" is not displayed in "Stress Test Name" text box; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 770078', function() {

    it('Should edit the name in the "Name" field to "Iraq War (3/2004)"', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Iraq War (3/2004)');

      // Verifying if the text box is set as "Iraq War (3/2004)"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Iraq War (3/2004)') {
          expect(false).customError('"Iraq War (3/2004)" is not displayed in "Stress Test Name" text box; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var names = ['End Date', 'Start Date'];
    var dates = ['9/30/2011', '8/31/2011'];

    names.forEach(function(name, index) {

      it('Should click on "' + name + '" calender button', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskStressTests.xpathDatePickerButton, name);

        ThiefHelpers.getButtonClassReference(undefined, xpath).press();
      });

      it('Should set the date to "' + dates[index] + '" in "' + name + '" text box', function() {
        ThiefHelpers.setDateInCalendar(dates[index], 2);
      });

      it('Verifying if the "' + name + '" text box is set to "' + dates[index] + '"', function() {
        ThiefHelpers.getDatepickerClassReference(name).getDate().then(function(date) {
          if (date !== dates[index]) {
            expect(false).customError('"' + name + '" text box is not set to "' + dates[index] + '"; Found: ' + date);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal/Dir_1/Dir_2');

    it('Should click on "Save" button from the "Edit Stress Test" dialog', function() {
      ThiefHelpers.getDialogButton('Edit Stress Test', 'Save').click().then(function() {
     }, function(err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
     });
    });

    it('Should wait until the saving operation is completed', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000);
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (found) {
          expect(false).customError('"Edit Stress Test" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 770079', function() {

    it('Should click on "Clear All" button to clear "Selected" list', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathClearAllIcon).press().then(function() {
     }, function(err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
     });
    });

    it('Should select "Iraq War (3/2004)" from the "Personal > Dir_1 > Dir_2" in available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Dir_2').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('Iraq War (3/2004)').then(function(item) {
                        item.select();

                        // Check if 'Iraq War (3/2004)' is selected
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"Iraq War (3/2004)" did not selected from "Available" section');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"Dir_2" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Dir_1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should click on "Columns" tab from LHP to select and verify the same', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555953', function() {

    it('Should expand "FactSet > Stress Testing > Extreme Event Stress Test" in the "Available" section and double click on "Percent Return (Event)"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Prices"
          group.getGroupByText('Stress Testing').then(function(secondGroup) {
            secondGroup.expand();

            //  Verifying if "Prices" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Extreme Event Stress Test').then(function(thirdGroup) {

                  // Expanding "Portfolio"
                  thirdGroup.expand();

                  // Verifying if "Portfolio" is expanded
                  thirdGroup.isExpanded().then(function(expanded) {
                    if (expanded) {
                      thirdGroup.getItemByText('Percent Return (Event)').then(function(element) {
                        element.select();
                        element.doubleClick();
                      });
                    } else {
                      expect(false).customError('"Extreme Event Stress Test" tree was not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              }
            });
          });
        }
      });
    });

    it('Verifying that "Percent Return (Event)" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Percent Return (Event)') === -1) {
          expect(false).customError('"Percent Return (Event)" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "ST % Value at Risk #VD #VT Day, #VC% #VA" in the "Selected section" and click on "X" button', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('ST % Value at Risk #VD #VT Day,  #VC% #VA');

      // Hover on "ST % Value at Risk #VD #VT Day, #VC% #VA" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });

      // ST % Value at Risk #VD #VT Day,  #VC% #VA
    });

    it('Verifying if "ST % Value at Risk #VD #VT Day, #VC% #VA" is removed from "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('ST % Value at Risk #VD #VT Day,  #VC% #VA') >= 0) {
          expect(false).customError('"ST % Value at Risk #VD #VT Day,  #VC% #VA" is not removed from the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555949', function() {

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaders = ['Barra Global Long-Term Model (GEM3L)|Iraq War (3/2004)', 'Barra Global Long-Term ' +
    'Model (GEM2L)|Iraq War (3/2004)', 'NIS US Fundamental Model|Iraq War (3/2004)',];
    var values = ['-4.7', '-3.9', '-7.1'];

    multiheaders.forEach(function(multiheader, index) {

      it('Verifying if the "' + multiheader + '|ST % Value at Risk 1 Calendar Day, 95%" column for "Total" row is set ' +
        'to "' + values[index] + '"', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(range) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', range, 'slick-pane slick-pane-top slick-' +
            'pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(totalValue) {
            // Ignoring second digit
            totalValue = totalValue.slice(0, -1);
            if (totalValue !== values[index]) {
              expect(false).customError('"' + multiheader + '|ST % Value at Risk 1 Calendar Day, 95%" column for ' +
                '"Total" row is set to "' + values[index] + '"; Found: ' + totalValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 555960', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should perform mouse hover on "Iraq War (3/2004)" from "Selected" section and Click "X" Icon', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsRiskStressTests.xpathSelectedContainer, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Iraq War (3/2004)');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });

      browser.sleep(3000);
    });

    it('Expand "Personal > Dir_1" from "Available" container and hover on "Dir_2" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(subGroup1) {
            subGroup1.expand();

            subGroup1.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup1.getGroupByText('Dir_2').then(function(subGroup2) {
                  subGroup2.getActions().then(function(actions) {
                    actions.triggerAction('remove');
                  });
                });
              }else {
                expect(false).customError('"Dir_1" is not expanded in the "Available" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded in the "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if the "Delete Stress Test Grouping" is displayed', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test Grouping').then(function(found) {
        if (!found) {
          expect(false).customError('"Delete Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Delete" button from the "Delete Stress Test Grouping" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test Grouping', 'Delete').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Delete Stress Test Grouping" disappeared', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test Grouping').then(function(found) {
        if (found) {
          expect(false).customError('"Delete Stress Test Grouping" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Personal > Dir_1" from "Available" container and verify if "Available"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(subGroup1) {
            subGroup1.expand();

            subGroup1.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup1.getChildrenText().then(function(elements) {
                  if (elements.length !== 1) {
                    expect(false).customError('Count of stress tests under "Personal > Dir_1" is not equal to 1, Found: ' + elements.length);
                    CommonFunctions.takeScreenShot();
                  }else {
                    if (elements[0].text !== 'Copy of Iraq War (3/2003) - Sim') {
                      expect(false).customError('"Copy of Iraq War (3/2003) - Sim" is not present under "Personal > Dir_1"');
                      CommonFunctions.takeScreenShot();
                    }
                  }

                });
              }else {
                expect(false).customError('"Dir_1" is not expanded in the "Selected" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded in the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 770080', function() {

    it('Expand "Personal > Dir_1" from "Available" container and hover on "Copy of Iraq War (3/2003) - Sim" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Dir_1').then(function(childGroup) {
            childGroup.expand();
            childGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                var item = childGroup.getItemByText('Copy of Iraq War (3/2003) - Sim');

                // Click on the "remove" icon
                item.then(function(remove) {
                  remove.getActions().then(function(val) {
                    val.triggerAction('remove');
                  });
                });
              } else {
                expect(false).customError('"Dir_1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Expand "Personal" from "Available" container and hover on "Dir_1" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var childGroup = group.getGroupByText('Dir_1');

          // Click on the "remove" icon
          return childGroup.then(function(remove) {
            return remove.getActions().then(function(val) {
              return val.triggerAction('remove');
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if the "Delete Stress Test Grouping" is displayed', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test Grouping').then(function(found) {
        if (!found) {
          expect(false).customError('"Delete Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Delete" button from the "Delete Stress Test Grouping" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test Grouping', 'Delete').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Delete Stress Test Grouping" disappeared', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test Grouping').then(function(found) {
        if (found) {
          expect(false).customError('"Delete Stress Test Grouping" dialog is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var deletedItems = ['Dir_1', 'Copy of Iraq War (3/2003) - Sim'];

    it('Verifying if "' + deletedItems + '" is deleted under "Personal"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(listItem) {
              if (deletedItems.indexOf(listItem.text) !== -1) {
                expect(false).customError('"' + deletedItems + '" stress tests are not deleted from "Personal" directory');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555961', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

});
